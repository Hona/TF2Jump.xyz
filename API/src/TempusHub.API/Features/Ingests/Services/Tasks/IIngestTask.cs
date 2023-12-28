namespace TempusHub.API.Features.Ingests.Services.Tasks;

public interface IIngestTask
{
    Task ExecuteAsync(Ingest ingest, DateOnly triggerDate, CancellationToken cancellationToken = default);
}