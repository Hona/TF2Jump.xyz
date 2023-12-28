using Microsoft.EntityFrameworkCore.Diagnostics;

namespace TempusHub.API.Common;

public static class DependencyInjection
{
    public static void AddEfCore(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<ISaveChangesInterceptor, EventPublisher>();

        services.AddDbContext<AppDbContext>((sp, options) =>
        {
            options.UseSqlServer(config.GetConnectionString("DefaultConnection"));

            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
        });
    }
}