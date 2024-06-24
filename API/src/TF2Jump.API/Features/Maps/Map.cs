using TF2Jump.API.Common.DataModelling;
using TF2Jump.API.Features.Zones;

namespace TF2Jump.API.Features.Maps;

public class Map : ArchivedBaseEntity
{
    public long Id { get; set; }
    public string Name { get; set; }
    public DateTime DateAdded { get; set; }
    public int DemomanTier { get; set; }
    public int SoldierTier { get; set; }
    
    public virtual ICollection<Zone> Zones { get; set; }
}