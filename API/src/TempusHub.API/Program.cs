using System.Reflection;
using System.Text.Json.Serialization;
using SteamWebAPI2.Utilities;
using TempusApi;
using TempusHub.API.Common;
using TempusHub.API.Kernel;

var appAssembly = Assembly.GetExecutingAssembly();
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEfCore(builder.Configuration);
builder.Services.AddMediatR(configure => configure.RegisterServicesFromAssemblyContaining<Program>());
builder.Services.AddSingleton<ITempusClient, TempusClient>();
builder.Services.AddHttpClient<TempusClient>();

builder.Services.AddSingleton(new SteamWebInterfaceFactory(builder.Configuration["SteamApiKey"]));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddExceptionHandler<ExceptionHandler.KnownExceptionsHandler>();

builder.Services.AddHostedService<DevelopmentMigrationHostedService>();

builder.Services.ConfigureModules(appAssembly);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseProductionExceptionHandler();

app.RegisterEndpoints(appAssembly);

app.Run();