using System.Text.RegularExpressions;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using SteamWebAPI2.Interfaces;
using SteamWebAPI2.Models;
using SteamWebAPI2.Utilities;
using TempusApi;
using TempusApi.Enums;
using TempusHub.API.Features.Demos.Services;
using TempusHub.API.Features.Reports.Queries.GetWorldRecordHistory;

namespace TempusHub.API.Features.Demos.Queries.GetWorldRecordChatLogsQuery;

public class GetWorldRecordChatLogsQueryEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGetWithOpenApi<WorldRecordHistoryResponse[]>("/chat-log/world-records", HandleAsync)
            .WithTags("Demos");
    }

    public static async Task<IResult> HandleAsync([FromQuery] long demoId, [FromQuery] Class? @class, TempusDemoService tempusDemoService, SteamWebInterfaceFactory webInterfaceFactory, ITempusClient tempusClient, CancellationToken cancellationToken)
    {
        var stvData = await tempusDemoService.ExtractDemoAsync(demoId, cancellationToken);
        
        var messages = stvData.Chat
            .Where(x => !string.IsNullOrWhiteSpace(x.Text))
            .Select(x => x.Text)
            .ToList();
        
        const string Pattern = @"^Tempus \| \(([^)]+)\) (.*?) beat the map record: (\d{2}:\d{2}\.\d{2}) \(WR -(\d{2}:\d{2}\.\d{2})\) \| (\d{2}:\d{2}\.\d{2}) improvement!$";

        var output = new List<WorldRecordChatLogResponse>();
        
        foreach (var message in messages)
        {
            var match = Regex.Match(message, Pattern);
            if (!match.Success)
            {
                continue;
            }

            var detectedClass = match.Groups[1].Value switch
            {
                "Solly" => Class.Soldier,
                "Demo" => Class.Demoman
            };
            var player = match.Groups[2].Value;
            var time = match.Groups[3].Value;
            var wrSplit = match.Groups[4].Value;
            var prSplit = match.Groups[5].Value;
            
            var steamId = stvData.Users.FirstOrDefault(x => x.Value.Name == player).Value.SteamId;
            
            var steamInterface = webInterfaceFactory.CreateSteamWebInterface<SteamUser>(new HttpClient());
            var playerSummaryResponse = await steamInterface.GetPlayerSummaryAsync(UsteamidToCommid(steamId));
            
            var playerInfo = await tempusClient.GetSearchResultAsync(HttpUtility.UrlEncode(playerSummaryResponse.Data.Nickname), cancellationToken);
            output.Add(new WorldRecordChatLogResponse(detectedClass, player, time, wrSplit, prSplit, steamId, playerInfo.Players.FirstOrDefault(), new SteamUserInfo(playerSummaryResponse.Data.Nickname, playerSummaryResponse.Data.SteamId, playerSummaryResponse.Data.ProfileUrl, playerSummaryResponse.Data.AvatarFullUrl)));
        }
        
        return Results.Ok(output);
    }
    
    private const ulong steamid64ident = 76561197960265728;

    public static ulong UsteamidToCommid(string usteamid)
    {
        usteamid = usteamid.Replace("[", "").Replace("]", "");

        string[] usteamidSplit = usteamid.Split(':');
        ulong commid = ulong.Parse(usteamidSplit[2]) + steamid64ident;

        return commid;
    }
}