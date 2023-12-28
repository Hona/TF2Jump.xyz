using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TempusHub.API.Features.Zones;

public class ZoneEfConfiguration : IEntityTypeConfiguration<Zone>
{
    public void Configure(EntityTypeBuilder<Zone> builder)
    {
        builder.HasKey(x => new { ArchiveDate = x.ArchivedDate, x.Id});
        builder.Property(x => x.ArchivedDate).IsRequired();

        builder.Property(e => e.Type).IsRequired();
        builder.Property(e => e.Index);
        builder.Property(e => e.CustomName)
            .HasMaxLength(128);

        builder.HasOne(d => d.Map)
            .WithMany(p => p.Zones)
            .HasForeignKey(d => new { d.ArchivedDate, d.MapId })
            .OnDelete(DeleteBehavior.Cascade);

    }
}