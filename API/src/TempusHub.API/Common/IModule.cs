namespace TempusHub.Common;

public interface IModule
{
    static abstract void ConfigureServices(IServiceCollection services);
}