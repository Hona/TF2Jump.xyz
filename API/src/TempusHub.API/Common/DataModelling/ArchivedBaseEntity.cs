namespace TempusHub.API.Common.DataModelling;

public abstract class ArchivedBaseEntity
{
    public required DateOnly ArchivedDate { get; set; }
}