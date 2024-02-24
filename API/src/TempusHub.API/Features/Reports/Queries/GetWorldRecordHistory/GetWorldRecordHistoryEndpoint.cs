using Microsoft.AspNetCore.Mvc;
using TempusApi;
using TempusApi.Enums;
using TempusHub.API.Common.Feature;

namespace TempusHub.API.Features.Reports.Queries.GetWorldRecordHistory;

public sealed class GetWorldRecordHistoryEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGetWithOpenApi<WorldRecordHistoryResponse[]>("/reports/world-record-history", HandleAsync)
            .WithTags("Report");
    }

    public static async Task<IResult> HandleAsync([FromQuery] string mapName, [FromQuery] ZoneType zoneType, [FromQuery] int zoneIndex, [FromQuery] Class @class, AppDbContext dbContext, ITempusClient tempusClient, CancellationToken cancellationToken)
    {
        var map = await dbContext.Maps
            .Include(m => m.Zones)
            .FirstOrDefaultAsync(m => m.Name == mapName, cancellationToken: cancellationToken);

        if (map is null)
        {
            return Results.NotFound($"Map {mapName} not found");
        }
        
        var zone = map.Zones.FirstOrDefault(z => z.Type == zoneType && z.Index == zoneIndex);
        
        if (zone is null)
        {
            return Results.NotFound($"Zone {zoneType} {zoneIndex} not found");
        }
        
        var query = dbContext.ZoneRecords
            .Where(zr => zr.ZoneId == zone.Id && zr.Class == @class)
            .Select(zr => new
            {
                zr.Id,
                zr.Date,
                zr.ZoneId,
                zr.Duration,
                zr.PlayerId,
                IsWorldRecord = !dbContext.ZoneRecords
                    .Any(innerZr => innerZr.ZoneId == zr.ZoneId && innerZr.Class == @class && innerZr.Date < zr.Date && innerZr.Duration < zr.Duration)
            })
            .Where(zr => zr.IsWorldRecord)
            .OrderBy(zr => zr.Date)
            .Select(zr => new WorldRecordHistoryResponse(zr.Id, zr.Date, zr.ZoneId, zr.Duration, zr.PlayerId))
            .AsNoTracking();

        var worldRecordHistory = await query.ToListAsync(cancellationToken: cancellationToken);

        foreach (var worldRecordHistoryResponse in worldRecordHistory)
        {
            var player = await tempusClient.GetPlayerInfoAsync(worldRecordHistoryResponse.PlayerId, cancellationToken);
            worldRecordHistoryResponse.PlayerName = player.Name;
            worldRecordHistoryResponse.SteamProfileUrl = GetSteamProfileUrl(player.Steamid);
        }
        
        return Results.Ok(worldRecordHistory);
    }

    private static string GetSteamProfileUrl(string steamId3)
    {
        try
        {
            var steamIdParts = steamId3.Split(':');
            var steamIdInstance = steamIdParts[1];
            var steamIdAccountId = steamIdParts[2];
            var steamIdCommunityId = (long.Parse(steamIdAccountId) * 2) + long.Parse(steamIdInstance);
            var steamIdCommunityUrl = $"https://steamcommunity.com/profiles/{steamIdCommunityId}";
            return steamIdCommunityUrl;
        }
        catch (Exception e)
        {
            return steamId3;
        }
    }

}