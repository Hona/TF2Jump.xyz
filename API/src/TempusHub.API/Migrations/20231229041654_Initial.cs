using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempusHub.API.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ingests",
                columns: table => new
                {
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    RowsWritten = table.Column<int>(type: "int", nullable: false),
                    Completed = table.Column<bool>(type: "bit", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingests", x => x.Date);
                });

            migrationBuilder.CreateTable(
                name: "Maps",
                columns: table => new
                {
                    ArchivedDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DemomanTier = table.Column<int>(type: "int", nullable: false),
                    SoldierTier = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maps", x => new { x.ArchivedDate, x.Id });
                });

            migrationBuilder.CreateTable(
                name: "Zones",
                columns: table => new
                {
                    ArchivedDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    MapId = table.Column<long>(type: "bigint", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false),
                    CustomName = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zones", x => new { x.ArchivedDate, x.Id });
                    table.ForeignKey(
                        name: "FK_Zones_Maps_ArchivedDate_MapId",
                        columns: x => new { x.ArchivedDate, x.MapId },
                        principalTable: "Maps",
                        principalColumns: new[] { "ArchivedDate", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ZoneRecords",
                columns: table => new
                {
                    ArchivedDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    ZoneId = table.Column<long>(type: "bigint", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Class = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<long>(type: "bigint", nullable: false),
                    PlayerId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZoneRecords", x => new { x.ArchivedDate, x.Id });
                    table.ForeignKey(
                        name: "FK_ZoneRecords_Zones_ArchivedDate_ZoneId",
                        columns: x => new { x.ArchivedDate, x.ZoneId },
                        principalTable: "Zones",
                        principalColumns: new[] { "ArchivedDate", "Id" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ZoneRecords_ArchivedDate_ZoneId",
                table: "ZoneRecords",
                columns: new[] { "ArchivedDate", "ZoneId" });

            migrationBuilder.CreateIndex(
                name: "IX_Zones_ArchivedDate_MapId",
                table: "Zones",
                columns: new[] { "ArchivedDate", "MapId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ingests");

            migrationBuilder.DropTable(
                name: "ZoneRecords");

            migrationBuilder.DropTable(
                name: "Zones");

            migrationBuilder.DropTable(
                name: "Maps");
        }
    }
}
