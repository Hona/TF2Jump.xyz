﻿using TempusHub.API.Features.ZoneRecords;

// Disable as we want the partial class to be in the same namespace as the original class
// ReSharper disable once CheckNamespace
namespace TempusHub.API.Common;

public partial class AppDbContext
{
    public DbSet<ZoneRecord> ZoneRecords { get; set; } = null!;
}