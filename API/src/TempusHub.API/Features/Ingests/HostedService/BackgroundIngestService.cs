using TempusHub.API.Features.Ingests.Services;

namespace TempusHub.API.Features.Ingests.HostedService;

public class BackgroundIngestService(ILogger<BackgroundIngestService> logger, IIngestService ingestService) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Only ingests if there is none existing
        await ingestService.IngestTempusApiAsync(stoppingToken);

        // The timer ticks based on the input, not including execution time - so we can't accidentally miss a day.
        using PeriodicTimer timer = new(TimeSpan.FromDays(1));

        try
        {
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                await ingestService.IngestTempusApiAsync(stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            logger.LogInformation("BackgroundIngestService is stopping");
        }
    }
}