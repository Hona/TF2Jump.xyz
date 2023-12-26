using TempusHub.API.Common;
using TempusHub.API.Features.Ingests.HostedService;
using TempusHub.API.Features.Ingests.Services;

namespace TempusHub.API.Features.Ingests;

public sealed class IngestModule : IModule
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<IIngestRepository, IngestRepository>();
        services.AddSingleton<IIngestService, IngestService>();
        services.AddHostedService<BackgroundIngestService>();
    }
}