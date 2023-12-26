namespace TempusHub.API.Common;

public interface IModule
{
    static abstract void ConfigureServices(IServiceCollection services);
}