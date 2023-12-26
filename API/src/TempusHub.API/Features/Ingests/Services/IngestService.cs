namespace TempusHub.API.Features.Ingests.Services;

public interface IIngestService
{
    Task<Result<Ingest>> IngestTempusApiAsync(CancellationToken cancellationToken = default);
}

public class IngestService(IIngestRepository ingestRepository, ILogger<IngestService> logger) : IIngestService
{
    private readonly SemaphoreSlim _semaphoreSlim = new(1, 1);
    public async Task<Result<Ingest>> IngestTempusApiAsync(CancellationToken cancellationToken = default)
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
        
            var ingest = new Ingest(now);
        
            // TODO: All ingest tasks
        
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