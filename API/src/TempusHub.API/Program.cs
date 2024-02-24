using System.Reflection;
using System.Text.Json.Serialization;
using TempusApi;
using TempusHub.API.Common.Persistence;
using TempusHub.API.Kernel;

var appAssembly = Assembly.GetExecutingAssembly();
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEfCore(builder.Configuration);
builder.Services.AddMediatR(configure => configure.RegisterServicesFromAssemblyContaining<Program>());
builder.Services.AddSingleton<ITempusClient, TempusClient>();
builder.Services.AddHttpClient<TempusClient>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddExceptionHandler<ExceptionHandler.KnownExceptionsHandler>();

builder.Services.AddHostedService<MigrationHostedService>();

builder.Services.ConfigureModules(appAssembly);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseProductionExceptionHandler();

app.RegisterEndpoints(appAssembly);

app.Run();