namespace TF2Jump.API.Common.Feature;

public interface IModule
{
    static abstract void ConfigureServices(IServiceCollection services);
}