using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.FluentUI.AspNetCore.Components;
using TempusHub.UI.Components;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddUserSecrets<App>();

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

builder.Services.AddCascadingAuthenticationState();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie()
    .AddSteam(x =>
    {
        x.ApplicationKey = builder.Configuration["Authentication:Steam:ApiKey"];
    });

builder.Services.AddHttpClient();
builder.Services.AddFluentUIComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.MapGet("/Account/Login", (HttpContext context, string returnUrl = "/") =>
{
    if (context.User.Identity is { IsAuthenticated: false })
    {
        return context.ChallengeAsync("Steam", 
            new AuthenticationProperties { RedirectUri = returnUrl });
    }
    
    context.Response.Redirect(returnUrl);
    return Task.CompletedTask;
});

app.Run();
