using TempusApi.Enums;
using TempusHub.API.Common.DataModelling;
using TempusHub.API.Features.Zones;

namespace TempusHub.API.Features.ZoneRecords;

public class ZoneRecord : ArchivedBaseEntity
{
    public long Id { get; set; }
    public long ZoneId { get; set; }
    public DateTime Date { get; set; }
    public Class Class { get; set; }
    public TimeSpan Duration { get; set; }
    public long PlayerId { get; set; }
    
    public virtual Zone Zone { get; set; }
}