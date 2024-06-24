using TF2Jump.API.Common.Feature;
using TF2Jump.API.Features.Ingests.HostedService;
using TF2Jump.API.Features.Ingests.Services;
using TF2Jump.API.Features.Ingests.Services.Tasks;

namespace TF2Jump.API.Features.Ingests;

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