using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.FluentUI.AspNetCore.Components;
using TempusApi;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.Services.AddFluentUIComponents();

builder.Services.AddHttpClient<ITempusClient, TempusClient>();
builder.Services.AddSingleton<ITempusClient, TempusClient>();

await builder.Build().RunAsync();
