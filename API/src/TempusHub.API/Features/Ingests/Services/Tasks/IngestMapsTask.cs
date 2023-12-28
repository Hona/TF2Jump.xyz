using System.Collections.Concurrent;
using TempusApi;
using TempusApi.Enums;
using TempusApi.Models.Responses;
using TempusHub.API.Features.Maps;
using TempusHub.API.Features.Zones;

namespace TempusHub.API.Features.Ingests.Services.Tasks;

public class IngestMapsTask(ITempusClient tempusClient, ILogger<IngestMapsTask> logger, AppDbContext dbContext) : IIngestTask
{
    public async Task ExecuteAsync(Ingest ingest, DateOnly triggerDate, CancellationToken cancellationToken = default)
    {
        var maps = await tempusClient.GetMapListAsync(cancellationToken);
        
        logger.LogInformation("IngestMaps: Will require {ApiRequestCount} API requests", 1 + maps.Count);
        
        var zoneTypes = new[]
        {
            ZoneType.Map,
            ZoneType.Course,
            ZoneType.Bonus,
            ZoneType.Trick
        };
        
        var fullMaps = new Dictionary<long, FullMapOverview2>();

        foreach (var mapDownloadChunk in maps.Chunk(5))
        {
            var tasks = mapDownloadChunk.Select(x => tempusClient.GetFullMapOverview2Async(x.Id, cancellationToken));
            var results = await Task.WhenAll(tasks);
            
            foreach (var fullMap in results)
            {
                fullMaps[fullMap.MapInfo.Id] = fullMap;
            }
        }

        for (var mapIndex = 0; mapIndex < maps.Count; mapIndex++)
        {
            logger.LogInformation("IngestMaps: Processing map {MapName} ({MapIndex}/{MapCount})",
                maps[mapIndex].Name, mapIndex + 1, maps.Count);
            
            var shortMapInfo = maps[mapIndex];
            var fullMap = fullMaps[shortMapInfo.Id];

            var map = new Map()
            {
                Id = fullMap.MapInfo.Id,
                Name = fullMap.MapInfo.Name,
                DateAdded = TempusUtility.GetDateFromTimestamp(fullMap.MapInfo.DateAdded),
                DemomanTier = fullMap.TierInfo.Demoman,
                SoldierTier = fullMap.TierInfo.Soldier,
                ArchivedDate = triggerDate
            };

            map.Zones = zoneTypes.SelectMany(zoneType => GetZoneInfos(zoneType, fullMap.Zones)
                .Select(zoneInfo => new Zone
                {
                    Id = zoneInfo.Id,
                    MapId = map.Id,
                    Type = zoneType,
                    Index = zoneInfo.Zoneindex,
                    CustomName = zoneInfo.CustomName,
                    ArchivedDate = triggerDate
                })
            ).ToList();

            await dbContext.Maps.AddAsync(map, cancellationToken);
        }

        await dbContext.SaveChangesAsync(cancellationToken);
    }
    
    private static List<ZoneInfo> GetZoneInfos(ZoneType zoneType, TempusApi.Models.Responses.Zones zones) =>
        zoneType switch
        {
            ZoneType.Map => zones.Map,
            ZoneType.Course => zones.Course ?? [],
            ZoneType.Bonus => zones.Bonus ?? [],
            ZoneType.Trick => zones.Trick ?? [],
            _ => throw new ArgumentOutOfRangeException(nameof(zoneType), zoneType, null)
        };
}