using TF2Jump.API.Common.DataModelling;

namespace TF2Jump.API.Features.Ingests;

public class TempusApiIngest : BaseEntity
{
    public TempusApiIngest(DateOnly date) => Date = date;

    public DateOnly Date { get; init; }
    public int RowsWritten { get; private set; }
    public bool Completed { get; private set; }
    public TimeSpan Duration { get; set; }
    private readonly DateTime _startedAt = DateTime.UtcNow;
    
    public void AddRowsWritten(int rowsWritten)
    {
        RowsWritten += rowsWritten;
    }
    
    public void Complete()
    {
        Completed = true;
        Duration = DateTime.UtcNow - _startedAt;
    }
}