using TempusHub.API.Features.Demos.Services;

namespace TempusHub.API.Features.Demos;

public class DemoModule : IModule
{
    public static void ConfigureServices(IServiceCollection services)
    {
        services.AddScoped<TempusDemoService>();
    }
}