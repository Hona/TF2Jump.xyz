namespace TempusHub.API.Common.DataModelling;

public abstract class BaseEntity
{
    public readonly List<INotification> StagedEvents = new();
}