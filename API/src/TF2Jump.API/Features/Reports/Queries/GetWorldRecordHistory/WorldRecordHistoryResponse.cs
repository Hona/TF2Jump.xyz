namespace TF2Jump.API.Features.Reports.Queries.GetWorldRecordHistory;

public record WorldRecordHistoryResponse(long Id, DateTime Date, long ZoneId, TimeSpan Duration, long PlayerId)
{
    public string PlayerName { get; set; } = string.Empty;
    public string SteamProfileUrl { get; set; } = string.Empty;
}