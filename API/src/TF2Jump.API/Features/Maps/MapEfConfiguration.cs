using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TF2Jump.API.Features.Maps;

public class MapEfConfiguration : IEntityTypeConfiguration<Map>
{
    public void Configure(EntityTypeBuilder<Map> builder)
    {
        builder.HasKey(x => new { ArchiveDate = x.ArchivedDate, x.Id});
        builder.Property(x => x.ArchivedDate).IsRequired();

        builder.Property(e => e.Name).IsRequired();
        builder.Property(e => e.DateAdded);
        builder.Property(e => e.DemomanTier);
        builder.Property(e => e.SoldierTier);
    }
}