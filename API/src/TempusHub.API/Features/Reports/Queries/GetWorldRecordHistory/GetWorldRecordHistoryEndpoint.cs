using Microsoft.AspNetCore.Mvc;
using TempusApi;
using TempusApi.Enums;

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
                BestDurationToDate = dbContext.ZoneRecords
                    .Where(innerZr => innerZr.ZoneId == zr.ZoneId && innerZr.Date <= zr.Date && innerZr.Class == @class)
                    .Min(innerZr => (TimeSpan?)innerZr.Duration)
            })
            .Where(zr => zr.Duration == zr.BestDurationToDate)
            .OrderBy(zr => zr.Date)
            .Select(zr => new WorldRecordHistoryResponse(zr.Id, zr.Date, zr.ZoneId, zr.Duration, zr.PlayerId));

        var worldRecordHistory = await query.ToListAsync(cancellationToken: cancellationToken);

        foreach (var worldRecordHistoryResponse in worldRecordHistory)
        {
            var player = await tempusClient.GetPlayerInfoAsync(worldRecordHistoryResponse.PlayerId, cancellationToken);
            worldRecordHistoryResponse.PlayerName = player.Name;
            
            /*
             *
             * A Steam ID can be converted to Steam Community ID for use on the Steam Community website.

Let X, Y and Z constants be defined by the SteamID: STEAM_X:Y:Z.

There are 2 methods of conversion:

For 32-bit systems
Using the formula W=Z*2+Y, a SteamID can be converted to the following link:
http or https://steamcommunity.com/path/[letter:1:W]
The account type letter can be found in the table above. The path can be found in the same place after the slash symbol.
Example: http://steamcommunity.com/profiles/[U:1:132276035]
Example: http://steamcommunity.com/gid/[g:1:4]
             */
            
            //worldRecordHistoryResponse.SteamProfileUrl = player.Steamid;
            try
            {
                var steamId = player.Steamid;
                var steamIdParts = steamId.Split(':');
                var steamIdUniverse = steamIdParts[0];
                var steamIdInstance = steamIdParts[1];
                var steamIdAccountId = steamIdParts[2];
                var steamIdCommunityId = (long.Parse(steamIdAccountId) * 2) + long.Parse(steamIdInstance);
                var steamIdCommunityUrl = $"https://steamcommunity.com/profiles/{steamIdCommunityId}";
                worldRecordHistoryResponse.SteamProfileUrl = steamIdCommunityUrl;
            }
            catch (Exception e)
            {
                worldRecordHistoryResponse.SteamProfileUrl = player.Steamid;

            }
            
        }
        
        
        return Results.Ok(worldRecordHistory);
    }

}