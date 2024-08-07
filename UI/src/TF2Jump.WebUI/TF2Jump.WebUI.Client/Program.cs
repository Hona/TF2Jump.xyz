using System.Globalization;
using Humanizer.Configuration;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.FluentUI.AspNetCore.Components;
using TempusApi;
using TF2Jump.WebUI.Client.Services;
using TF2Jump.WebUI.Utilities.Humanizer;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

StandardDateFormatter.Register();

builder.Services.AddFluentUIComponents();

builder.Services.AddHttpClient<ITempusClient, TempusClient>();
builder.Services.AddSingleton<ITempusClient, TempusClient>();
builder.Services.AddSingleton<ServerResolver>();

await builder.Build().RunAsync();
