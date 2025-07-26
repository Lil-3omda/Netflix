using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Netflix.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class NewMoaz : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Videos",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Videos");
        }
    }
}
