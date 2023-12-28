namespace TempusHub.API.Kernel;

public class DevelopmentMigrationHostedService(IServiceProvider sp, IWebHostEnvironment env, ILogger<DevelopmentMigrationHostedService> logger) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        if (!env.IsDevelopment())
        {
            return;
        }
        
        logger.LogInformation("Running migrations in development");
        using var scope = sp.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        //await dbContext.Database.EnsureDeletedAsync(cancellationToken);
        await dbContext.Database.EnsureCreatedAsync(cancellationToken);
        await dbContext.Database.MigrateAsync(cancellationToken);
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}