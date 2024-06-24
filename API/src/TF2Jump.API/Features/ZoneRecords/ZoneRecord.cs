using TempusApi.Enums;
using TF2Jump.API.Common.DataModelling;
using TF2Jump.API.Features.Zones;

namespace TF2Jump.API.Features.ZoneRecords;

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