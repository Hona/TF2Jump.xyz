using TempusApi.Enums;
using TempusHub.API.Features.Maps;
using TempusHub.API.Features.ZoneRecords;

namespace TempusHub.API.Features.Zones;

public class Zone : ArchivedBaseEntity
{
    public long Id { get; set; }
    public long MapId { get; set; }
    public ZoneType Type { get; set; }
    public int Index { get; set; }
    public string? CustomName { get; set; }
    public virtual Map Map { get; set; }
    
    public virtual ICollection<ZoneRecord> Records { get; set; }
}