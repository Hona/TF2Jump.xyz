using TF2Jump.API.Features.Ingests;

// Disable as we want the partial class to be in the same namespace as the original class
// ReSharper disable once CheckNamespace
namespace TF2Jump.API.Common;

public partial class AppDbContext
{
    public DbSet<TempusApiIngest> Ingests { get; set; } = null!;
}