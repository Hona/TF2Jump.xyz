namespace TempusHub.API.Features.Ingests.Services;

public static class TempusUtility
{
    public static DateTime GetDateFromTimestamp(double timestamp)
    {
        // Convert the timestamp to milliseconds and then to long
        var milliseconds = (long)(timestamp * 1000);

        return DateTimeOffset.FromUnixTimeMilliseconds(milliseconds).DateTime;
    }
}