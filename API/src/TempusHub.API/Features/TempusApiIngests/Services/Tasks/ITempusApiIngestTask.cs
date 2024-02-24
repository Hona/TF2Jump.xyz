namespace TempusHub.API.Features.Ingests.Services.Tasks;

public interface ITempusApiIngestTask
{
    Task ExecuteAsync(TempusApiIngest tempusApiIngest, DateOnly triggerDate, CancellationToken cancellationToken = default);
}