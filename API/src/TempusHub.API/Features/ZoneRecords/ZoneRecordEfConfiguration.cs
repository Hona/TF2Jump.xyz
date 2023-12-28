using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TempusHub.API.Features.ZoneRecords;

public class ZoneRecordEfConfiguration : IEntityTypeConfiguration<ZoneRecord>
{
    public void Configure(EntityTypeBuilder<ZoneRecord> builder)
    {
        // Key: Date & Id
        builder.HasKey(x => new { ArchiveDate = x.ArchivedDate, x.Id});
        builder.Property(x => x.ArchivedDate).IsRequired();
        
        builder.Property(x => x.Id).ValueGeneratedNever();
        builder.Property(x => x.ZoneId).IsRequired();
        builder.Property(x => x.Date).IsRequired();
        builder.Property(x => x.Class).IsRequired();
        builder.Property(x => x.Duration)
            .IsRequired()
            .HasConversion(x => x.Ticks, x => TimeSpan.FromTicks(x));
        builder.Property(x => x.PlayerId).IsRequired();
        
        builder.HasOne(d => d.Zone)
            .WithMany(p => p.Records)
            .HasForeignKey(d => new { d.ArchivedDate, d.ZoneId })
            .OnDelete(DeleteBehavior.Cascade);
    }
}