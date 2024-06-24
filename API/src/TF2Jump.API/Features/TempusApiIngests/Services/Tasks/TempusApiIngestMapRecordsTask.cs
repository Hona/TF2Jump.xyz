using EFCore.BulkExtensions;
using TempusApi;
using TempusApi.Enums;
using TempusApi.Models.Activity;
using TempusApi.Models.DetailedMapList;
using TF2Jump.API.Common;
using TF2Jump.API.Common.Tempus;
using TF2Jump.API.Features.ZoneRecords;

namespace TF2Jump.API.Features.Ingests.Services.Tasks;

public class TempusApiIngestMapRecordsTask(ITempusClient tempusClient, ILogger<TempusApiIngestMapRecordsTask> logger, AppDbContext dbContext) : ITempusApiIngestTask
{
    public async Task ExecuteAsync(TempusApiIngest tempusApiIngest, DateOnly triggerDate, CancellationToken cancellationToken = default)
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

            int batchSize = 5;

            foreach (var batch in allMaps.Chunk(5))
            {
                var tasks = batch.Select(map => FetchMapRecords(map, zoneTypes, tempusClient, triggerDate, cancellationToken)).ToArray();
                var batchResults = await Task.WhenAll(tasks);
                
                var allFetchedRecords = batchResults.SelectMany(x => x).ToList();
                if (allFetchedRecords.Count != 0)
                {
                    await dbContext.BulkInsertAsync(allFetchedRecords, cancellationToken: cancellationToken);
                }
            }

            await transaction.CommitAsync(cancellationToken);
        }

    private async Task<IEnumerable<ZoneRecord>> FetchMapRecords(DetailedMapOverviewModel map, ZoneType[] zoneTypes, ITempusClient tempusClient, DateOnly triggerDate, CancellationToken cancellationToken)
    {
        logger.LogInformation("IngestMapRecords: Fetching records for map {MapName}", map.Name);
        var allRecords = new List<ZoneRecord>();

        foreach (var zoneType in zoneTypes)
        {
            for (var zoneIndex = 1; zoneIndex <= GetZoneCount(zoneType, map.ZoneCounts); zoneIndex++)
            {
                var allZoneRecords = await tempusClient.GetTopZonedTimes(map.Id, zoneType, zoneIndex, limit: 0, cancellationToken: cancellationToken);

                allZoneRecords.Runs.DemomanRuns ??= new List<RecordInfoShort>();
                allZoneRecords.Runs.SoldierRuns ??= new List<RecordInfoShort>();

                allRecords.AddRange(allZoneRecords.Runs.DemomanRuns
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
                    }));
            }
        }

        return allRecords;
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