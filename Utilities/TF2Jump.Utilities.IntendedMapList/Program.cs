using TempusApi;
using TempusApi.Enums;

var tempus = new TempusClient(new HttpClient());

var maps = await tempus.GetMapListAsync();

var mapClassesText = await File.ReadAllLinesAsync("MapClasses.csv");
var intendedMapClasses = mapClassesText
    .Select(x => x.Split(','))
    .Select(x => new MapClass(x[0] switch
    {
        "S" => IntendedClass.Soldier,
        "D" => IntendedClass.Demoman,
        _ => IntendedClass.Demoman | IntendedClass.Soldier
    }, x[1]))
    .ToList();

var missingMaps = maps.Select(x => x.Name)
    .Except(intendedMapClasses.Select(x => x.Map))
    .OrderBy(x => x)
    .ToList();
if (missingMaps.Any())
{
    Console.WriteLine("Missing maps:");
    foreach (var missingMap in missingMaps)
    {
        Console.WriteLine(missingMap);
    }
}

var invalidMaps = intendedMapClasses
    .Where(x => !maps.Select(y => y.Name).Contains(x.Map))
    .OrderBy(x => x.Map)
    .ToList();
if (invalidMaps.Any())
{
    Console.WriteLine("Invalid maps:");
    foreach (var invalidMap in invalidMaps)
    {
        Console.WriteLine(invalidMap.Map);
    }
}

var duplicateMaps = intendedMapClasses
    .GroupBy(x => x.Map)
    .Where(x => x.Count() > 1)
    .Select(x => x.Key)
    .OrderBy(x => x)
    .ToList();

if (duplicateMaps.Any())
{
    Console.WriteLine("Duplicate maps:");
    foreach (var duplicateMap in duplicateMaps)
    {
        Console.WriteLine(duplicateMap);
    }
}

record MapClass(IntendedClass Class, string Map);

[Flags]
enum IntendedClass
{
    Soldier,
    Demoman
}