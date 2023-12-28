namespace TempusHub.API.Common;

public abstract class ArchivedBaseEntity
{
    public required DateOnly ArchivedDate { get; set; }
}