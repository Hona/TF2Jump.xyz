using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using TempusHub.API.Common;

namespace TempusHub.API.Features.Ingests;

public class Ingest : BaseEntity
{
    public Ingest(DateOnly date) => Date = date;

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