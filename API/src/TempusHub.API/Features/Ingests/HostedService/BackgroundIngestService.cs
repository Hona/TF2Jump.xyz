using TempusHub.API.Features.Ingests.Services;

namespace TempusHub.API.Features.Ingests.HostedService;

public class BackgroundIngestService(ILogger<BackgroundIngestService> logger, IServiceProvider sp) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        // Only ingests if there is none existing
        await ExecuteIngestAsync(stoppingToken);

        // The timer ticks based on the input, not including execution time - so we can't accidentally miss a day.
        using PeriodicTimer timer = new(TimeSpan.FromDays(1));

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
        var ingestService = scope.ServiceProvider.GetRequiredService<IIngestService>();
        
        await ingestService.IngestTempusApiAsync(cancellationToken);
    }
}