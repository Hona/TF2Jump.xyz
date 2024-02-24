using TempusHub.API.Common.Feature;
using TempusHub.API.Features.Ingests.HostedService;
using TempusHub.API.Features.Ingests.Services;
using TempusHub.API.Features.Ingests.Services.Tasks;

namespace TempusHub.API.Features.Ingests;

public sealed class TempusApiIngestModule : IModule
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<ITempusApiIngestService, TempusApiIngestService>();
        services.AddHostedService<BackgroundTempusApiIngestService>();
        
        services.AddScoped<ITempusApiIngestTask, TempusApiIngestMapsTask>();
        services.AddScoped<ITempusApiIngestTask, TempusApiIngestMapRecordsTask>();
    }
}