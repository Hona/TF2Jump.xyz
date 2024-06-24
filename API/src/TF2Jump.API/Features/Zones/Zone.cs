using TempusApi.Enums;
using TF2Jump.API.Common.DataModelling;
using TF2Jump.API.Features.Maps;
using TF2Jump.API.Features.ZoneRecords;

namespace TF2Jump.API.Features.Zones;

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