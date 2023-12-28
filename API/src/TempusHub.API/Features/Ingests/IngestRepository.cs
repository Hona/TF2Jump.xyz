using TempusHub.API.Common;

namespace TempusHub.API.Features.Ingests;

public interface IIngestRepository
{
    Task<Ingest?> GetLatestAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<Ingest>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Ingest?> GetByDateAsync(DateOnly date, CancellationToken cancellationToken = default);
    Task<Ingest> AddAsync(Ingest ingest, CancellationToken cancellationToken = default);
    Task DeleteAsync(Ingest ingest, CancellationToken cancellationToken = default);
    Task UpdateAsync(Ingest ingest, CancellationToken cancellationToken = default);
}

public class IngestRepository : IIngestRepository
{
    private readonly AppDbContext _appDbContext;

    public IngestRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<Ingest?> GetLatestAsync(CancellationToken cancellationToken = default)
    {
        return await _appDbContext.Ingests
            .OrderByDescending(x => x.Date)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IEnumerable<Ingest>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var query = _appDbContext.Ingests.AsQueryable();
        return await query.ToListAsync(cancellationToken);
    }

    public async Task<Ingest?> GetByDateAsync(DateOnly date, CancellationToken cancellationToken = default)
    {
        return await _appDbContext.Ingests.FirstOrDefaultAsync(x => x.Date == date, cancellationToken);
    }

    public async Task<Ingest> AddAsync(Ingest ingest, CancellationToken cancellationToken = default)
    {
        _appDbContext.Ingests.Add(ingest);
        await _appDbContext.SaveChangesAsync(cancellationToken);
        return ingest;
    }

    public async Task DeleteAsync(Ingest ingest, CancellationToken cancellationToken = default)
    {
        _appDbContext.Ingests.Remove(ingest);
        await _appDbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(Ingest ingest, CancellationToken cancellationToken = default)
    {
        _appDbContext.Ingests.Update(ingest);
        await _appDbContext.SaveChangesAsync(cancellationToken);
    }
}