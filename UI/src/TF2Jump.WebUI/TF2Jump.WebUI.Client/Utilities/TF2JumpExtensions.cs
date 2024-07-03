namespace TF2Jump.WebUI.Client.Utilities;

public static class TF2JumpExtensions
{
    public const string MapClassesUrl =
        "https://raw.githubusercontent.com/Hona/TF2Jump.xyz/main/Utilities/TF2Jump.Utilities.IntendedMapList/MapClasses.csv";

    
    public static async Task<Dictionary<string, IntendedClasses>> GetIntendedClassMapListAsync(this HttpClient client)
    {
        var text = await client.GetStringAsync(MapClassesUrl);
        
        return text
            .Split('\n')
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Select(x => x.Split(','))
            .ToDictionary(x => x[1], x => x[0] switch
            {
                "S" => IntendedClasses.Soldier,
                "D" => IntendedClasses.Demoman,
                _ => IntendedClasses.Demoman | IntendedClasses.Soldier
            });
    }
}
    
[Flags]
public enum IntendedClasses
{
    None = 0,
    Soldier = 1 << 0,
    Demoman = 1 << 1
}
