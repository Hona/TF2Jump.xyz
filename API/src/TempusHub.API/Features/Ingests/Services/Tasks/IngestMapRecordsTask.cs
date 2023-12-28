using EFCore.BulkExtensions;
using TempusApi;
using TempusApi.Enums;
using TempusApi.Models.DetailedMapList;
using TempusHub.API.Features.ZoneRecords;

namespace TempusHub.API.Features.Ingests.Services.Tasks;

public class IngestMapRecordsTask(ITempusClient tempusClient, ILogger<IngestMapRecordsTask> logger, AppDbContext dbContext) : IIngestTask
{
    public async Task ExecuteAsync(Ingest ingest, DateOnly triggerDate, CancellationToken cancellationToken = default)
    {
        var allMaps = await tempusClient.GetDetailedMapListAsync(cancellationToken);

        var zoneTypes = new[]
        {
            ZoneType.Map,
            ZoneType.Course,
            ZoneType.Bonus,
            ZoneType.Trick
        };
        
        logger.LogInformation("IngestMapRecords: Will require {ApiRequestCount} API requests", 
            1 + allMaps
                .SelectMany(x => zoneTypes
                    .Select(zt => GetZoneCount(zt, x.ZoneCounts)))
                .Sum());

        await using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);

        for (var mapIndex = 0; mapIndex < allMaps.Count; mapIndex++)
        {
            var map = allMaps[mapIndex];
            
            logger.LogInformation("IngestMapRecords: Processing map {MapName} ({MapIndex}/{MapCount})",
                map.Name, mapIndex + 1, allMaps.Count);
            
            foreach (var zoneType in zoneTypes)
            {
                for (var zoneIndex = 1; zoneIndex <= GetZoneCount(zoneType, map.ZoneCounts); zoneIndex++)
                {
                    var allZoneRecords = await tempusClient.GetTopZonedTimes(map.Id, zoneType, zoneIndex, limit: 0,
                        cancellationToken: cancellationToken);

                    logger.LogInformation("Got {Count} records for {MapName} {ZoneType} {ZoneIndex}",
                        allZoneRecords.Runs.DemomanRuns.Count + allZoneRecords.Runs.SoldierRuns.Count, map.Name,
                        zoneType, zoneIndex);

                    // Null defense for concat
                    allZoneRecords.Runs.DemomanRuns ??= [];
                    allZoneRecords.Runs.SoldierRuns ??= [];

                    // Combine solly & demo runs into 1 enumerable, so only 1 projection is needed
                    var allRecords = allZoneRecords.Runs.DemomanRuns
                        .Concat(allZoneRecords.Runs.SoldierRuns)
                        .Select(x => new ZoneRecord()
                        {
                            Id = x.Id,
                            ZoneId = x.ZoneId,
                            Date = TempusUtility.GetDateFromTimestamp(x.Date),
                            Class = x.Class,
                            Duration = TimeSpan.FromSeconds(x.Duration),
                            PlayerId = x.UserId,
                            ArchivedDate = triggerDate
                        });

                    await dbContext.BulkInsertAsync(allRecords, cancellationToken: cancellationToken);
                }
            }
        }

        await transaction.CommitAsync(cancellationToken);
    }

    private static int GetZoneCount(ZoneType zoneType, ZoneCounts mapZoneCounts) =>
        zoneType switch
        {
            ZoneType.Map => mapZoneCounts.Map,
            ZoneType.Course => mapZoneCounts.Course ?? 0,
            ZoneType.Bonus => mapZoneCounts.Bonus ?? 0,
            ZoneType.Trick => mapZoneCounts.Trick ?? 0,
            _ => throw new ArgumentOutOfRangeException(nameof(zoneType), zoneType, null)
        };
}