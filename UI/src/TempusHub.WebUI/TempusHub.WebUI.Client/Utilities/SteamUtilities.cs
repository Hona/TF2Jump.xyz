namespace TempusHub.WebUI.Utilities;

public static class SteamUtilities
{
    public static long ConvertToSteamId64(string steamId)
    {
        const long steamId64Identifier = 76561197960265728; // SteamID64 identifier for accounts
        string[] parts = steamId.Replace("STEAM_0:", "").Split(':');

        if (parts.Length < 2)
        {
            throw new ArgumentException("Invalid SteamID format", nameof(steamId));
        }

        if (!long.TryParse(parts[0], out long x) || !long.TryParse(parts[1], out long y))
        {
            throw new ArgumentException("SteamID contains invalid numbers", nameof(steamId));
        }

        return (y * 2) + steamId64Identifier + x;
    }
}