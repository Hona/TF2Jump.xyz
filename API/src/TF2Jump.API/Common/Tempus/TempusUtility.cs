namespace TF2Jump.API.Common.Tempus;

public static class TempusUtility
{
    public static DateTime GetDateFromTimestamp(double timestamp)
    {
        // Convert the timestamp to milliseconds and then to long
        var milliseconds = (long)(timestamp * 1000);

        return DateTimeOffset.FromUnixTimeMilliseconds(milliseconds).DateTime;
    }
}