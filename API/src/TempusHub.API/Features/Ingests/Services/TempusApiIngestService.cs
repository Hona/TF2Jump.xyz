using System.Diagnostics;
using TempusHub.API.Features.Ingests.Services.Tasks;

namespace TempusHub.API.Features.Ingests.Services;

public interface ITempusApiIngestService
{
    Task<Result<TempusApiIngest>> IngestTempusApiAsync(CancellationToken cancellationToken = default);
}

public class TempusApiIngestService(IIngestRepository ingestRepository, ILogger<TempusApiIngestService> logger, IServiceProvider sp) : ITempusApiIngestService
{
    private readonly SemaphoreSlim _semaphoreSlim = new(1, 1);

    public async Task<Result<TempusApiIngest>> IngestTempusApiAsync(CancellationToken cancellationToken = default)
    {
        logger.LogInformation("Ingest begun, waiting for lock");
        await _semaphoreSlim.WaitAsync(cancellationToken);
        try
        {
            logger.LogInformation("Ingest lock acquired");
            var now = DateOnly.FromDateTime(DateTime.UtcNow);
        
            var existingIngest = await ingestRepository.GetByDateAsync(now, cancellationToken);
        
            if (existingIngest is not null)
            {
                return Result.Conflict();
            }
        
            var ingest = new TempusApiIngest(now);

            var tasks = sp.GetServices<ITempusApiIngestTask>();

            foreach (var task in tasks)
            {
                var timer = Stopwatch.StartNew();
                await task.ExecuteAsync(ingest, now, cancellationToken);
                timer.Stop();
                logger.LogInformation("Ingest task {TaskName} took {TaskDuration}", task.GetType().Name, timer.Elapsed);
            }
        
            ingest.Complete();
            ingest = await ingestRepository.AddAsync(ingest, cancellationToken);
            
            logger.LogInformation("Ingest completed took {IngestDuration}, wrote {IngestRows} rows", ingest.Duration, ingest.RowsWritten);
            
            return ingest;
        }
        finally
        {
            _semaphoreSlim.Release();
        }
    }
}