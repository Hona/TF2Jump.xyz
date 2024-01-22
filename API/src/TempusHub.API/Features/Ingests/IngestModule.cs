using TempusHub.API.Common.Feature;
using TempusHub.API.Features.Ingests.HostedService;
using TempusHub.API.Features.Ingests.Services;
using TempusHub.API.Features.Ingests.Services.Tasks;

namespace TempusHub.API.Features.Ingests;

public sealed class IngestModule : IModule
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IIngestRepository, IngestRepository>();
        services.AddScoped<ITempusApiIngestService, TempusApiIngestService>();
        services.AddHostedService<BackgroundIngestService>();
        
        services.AddScoped<ITempusApiIngestTask, TempusApiIngestMapsTask>();
        services.AddScoped<ITempusApiIngestTask, TempusApiIngestMapRecordsTask>();
    }
}