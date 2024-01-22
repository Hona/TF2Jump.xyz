namespace TempusHub.API.Features.Ingests;

public interface IIngestRepository
{
    Task<TempusApiIngest?> GetLatestAsync(CancellationToken cancellationToken = default);
    Task<IEnumerable<TempusApiIngest>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TempusApiIngest?> GetByDateAsync(DateOnly date, CancellationToken cancellationToken = default);
    Task<TempusApiIngest> AddAsync(TempusApiIngest tempusApiIngest, CancellationToken cancellationToken = default);
    Task DeleteAsync(TempusApiIngest tempusApiIngest, CancellationToken cancellationToken = default);
    Task UpdateAsync(TempusApiIngest tempusApiIngest, CancellationToken cancellationToken = default);
}

public class IngestRepository : IIngestRepository
{
    private readonly AppDbContext _appDbContext;

    public IngestRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<TempusApiIngest?> GetLatestAsync(CancellationToken cancellationToken = default)
    {
        return await _appDbContext.Ingests
            .OrderByDescending(x => x.Date)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<IEnumerable<TempusApiIngest>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var query = _appDbContext.Ingests.AsQueryable();
        return await query.ToListAsync(cancellationToken);
    }

    public async Task<TempusApiIngest?> GetByDateAsync(DateOnly date, CancellationToken cancellationToken = default)
    {
        return await _appDbContext.Ingests.FirstOrDefaultAsync(x => x.Date == date, cancellationToken);
    }

    public async Task<TempusApiIngest> AddAsync(TempusApiIngest tempusApiIngest, CancellationToken cancellationToken = default)
    {
        _appDbContext.Ingests.Add(tempusApiIngest);
        await _appDbContext.SaveChangesAsync(cancellationToken);
        return tempusApiIngest;
    }

    public async Task DeleteAsync(TempusApiIngest tempusApiIngest, CancellationToken cancellationToken = default)
    {
        _appDbContext.Ingests.Remove(tempusApiIngest);
        await _appDbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(TempusApiIngest tempusApiIngest, CancellationToken cancellationToken = default)
    {
        _appDbContext.Ingests.Update(tempusApiIngest);
        await _appDbContext.SaveChangesAsync(cancellationToken);
    }
}