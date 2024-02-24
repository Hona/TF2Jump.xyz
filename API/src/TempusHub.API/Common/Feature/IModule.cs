namespace TempusHub.API.Common.Feature;

public interface IModule
{
    static abstract void ConfigureServices(IServiceCollection services);
}