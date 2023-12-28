using TempusHub.API.Common;
using TempusHub.API.Features.Ingests.HostedService;
using TempusHub.API.Features.Ingests.Services;
using TempusHub.API.Features.Ingests.Services.Tasks;

namespace TempusHub.API.Features.Ingests;

public sealed class IngestModule : IModule
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IIngestRepository, IngestRepository>();
        services.AddScoped<IIngestService, IngestService>();
        services.AddHostedService<BackgroundIngestService>();
        
        services.AddScoped<IIngestTask, IngestMapsTask>();
        services.AddScoped<IIngestTask, IngestMapRecordsTask>();
    }
}