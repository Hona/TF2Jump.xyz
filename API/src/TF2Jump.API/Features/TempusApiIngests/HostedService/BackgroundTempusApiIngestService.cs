using TF2Jump.API.Common;
using TF2Jump.API.Features.Ingests.Services;

namespace TF2Jump.API.Features.Ingests.HostedService;

public class BackgroundTempusApiIngestService(ILogger<BackgroundTempusApiIngestService> logger, IServiceProvider sp) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Only ingests if there is none existing
        await ExecuteIngestAsync(stoppingToken);

        // The timer ticks based on the input, not including execution time - so we can't accidentally miss a day.
        // We also know that the ingest above is forced to run on cycle, so we dont need to worry about it running more than weekly
        using PeriodicTimer timer = new(TimeSpan.FromDays(7));

        try
        {
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                await ExecuteIngestAsync(stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            logger.LogInformation("BackgroundIngestService is stopping");
        }
    }

    private async Task ExecuteIngestAsync(CancellationToken cancellationToken = default)
    {
        using var scope = sp.CreateScope();

        await using var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        
        var lastIngest = await db.Ingests
            .OrderByDescending(x => x.Date)
            .FirstOrDefaultAsync(cancellationToken);

        // If the last ingest was less than 7 days ago, wait until it's been 7 days
        if (lastIngest is not null)
        {
            var timeSinceLastIngest = DateTime.UtcNow - lastIngest.Date.ToDateTime(TimeOnly.MinValue);
            if (timeSinceLastIngest < TimeSpan.FromDays(7))
            {
                await Task.Delay(TimeSpan.FromDays(7) - timeSinceLastIngest, cancellationToken);
            }
        }
        
        var ingestService = scope.ServiceProvider.GetRequiredService<ITempusApiIngestService>();
        
        await ingestService.IngestTempusApiAsync(cancellationToken);
    }
}