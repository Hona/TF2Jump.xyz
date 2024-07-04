using System.Net;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using TempusApi.Models;
using TempusApi.Models.Responses;
using TF2Jump.WebUI.Client.Components.Pages.Play;

namespace TF2Jump.WebUI.Client.Services;

public class ServerResolver
{
    private HttpClient _httpClient;

    public ServerResolver(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public string GetConnectUri(ServerStatusModel server, Dictionary<long, IPAddress> dnsLookup) => GetConnectUri(server.ServerInfo, dnsLookup);
    
    public string GetConnectUri(ServerInfo server, Dictionary<long, IPAddress> dnsLookup)
    {
        if (dnsLookup.TryGetValue(server.Id, out var value))
        {
            return $"steam://connect/{value}:{server.Port}";
        }
        
        return $"steam://connect/{server.Addr}:{server.Port}";
    }
    public async Task<Dictionary<long, IPAddress>> HydrateDnsLookups(List<ServerStatusModel> servers) => await HydrateDnsLookups(servers.Select(x => x.ServerInfo).ToList());

    public async Task<Dictionary<long, IPAddress>> HydrateDnsLookups(List<ServerInfo> servers)
    {
        var output = new Dictionary<long, IPAddress>();
        
        foreach (var server in servers)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(server.Addr))
                {
                    var response = await _httpClient.GetFromJsonAsync<DnsResult>("https://dns.google/resolve?name=" + server.Addr);
                    var ip = response?.Answer?[0].Data;
                    if (ip != null) output[server.Id] = IPAddress.Parse(ip);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Failed to resolve server IP");
                Console.WriteLine(e);
            }
        }

        return output;
    }
}

public class DnsResult
{
    [JsonPropertyName("Answer")]
    // ReSharper disable once MemberHidesStaticFromOuterClass
    public Answer[] Answer { get; set; } = null!;
}

public class Answer
{
    [JsonPropertyName("data")]
    public required string Data { get; set; }
}