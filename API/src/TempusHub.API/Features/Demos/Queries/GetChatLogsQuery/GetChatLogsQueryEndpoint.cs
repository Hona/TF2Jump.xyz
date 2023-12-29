using System.IO.Compression;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using TempusApi;
using TempusHub.API.Features.Demos.Services;
using TempusHub.API.Features.Reports.Queries.GetWorldRecordHistory;

namespace TempusHub.API.Features.Demos.Queries.GetChatLogsQuery;

public sealed class GetChatLogsQueryEndpoint : IEndpoint
{
    public static void MapEndpoint(IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGetWithOpenApi<string[]>("/chat-log", HandleAsync)
            .WithTags("Demos");
    }

    public static async Task<IResult> HandleAsync([FromQuery] long demoId, TempusDemoService tempusDemoService, CancellationToken cancellationToken)
    {
        var stvData = await tempusDemoService.ExtractDemoAsync(demoId, cancellationToken);
        
        var messages = stvData.Chat
            .Where(x => !string.IsNullOrWhiteSpace(x.Text))
            .Select(x => x.Text)
            .ToList();
        
        return Results.Ok(messages);
    }
}