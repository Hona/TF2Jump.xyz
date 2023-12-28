using TempusHub.API.Features.Zones;

namespace TempusHub.API.Features.Maps;

public class Map : ArchivedBaseEntity
{
    public long Id { get; set; }
    public string Name { get; set; }
    public DateTime DateAdded { get; set; }
    public int DemomanTier { get; set; }
    public int SoldierTier { get; set; }
    
    public virtual ICollection<Zone> Zones { get; set; }
}