namespace TempusHub.WebUI.Utilities;

public static class TempusApiUtilities
{
    public static DateTimeOffset ToDateTimeOffset(this double timestamp)
    {
        // Convert the timestamp to milliseconds and then to long
        var milliseconds = (long)(timestamp * 1000);

        return DateTimeOffset.FromUnixTimeMilliseconds(milliseconds);
    }
    
    public static TimeSpan ToTimeSpan(this double duration)
    {
        var seconds = (int)Math.Truncate(duration);
        var milliseconds = (duration - (int)Math.Truncate(duration)) * 1000;
        var timespan = new TimeSpan(0, 0, 0, seconds, (int)Math.Truncate(milliseconds));
        return timespan;
    }

    public static string ToFormattedDuration(this TimeSpan timespan) 
        => timespan.Days > 0 
            ? timespan.ToString(@"dd\:hh\:mm\:ss\.fff") 
            : timespan.ToString(timespan.Hours > 0 ? @"hh\:mm\:ss\.fff" : @"mm\:ss\.fff");
}