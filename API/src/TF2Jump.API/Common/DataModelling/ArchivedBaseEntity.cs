namespace TF2Jump.API.Common.DataModelling;

public abstract class ArchivedBaseEntity
{
    public required DateOnly ArchivedDate { get; set; }
}