using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Netflix.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class newvideo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "Videos",
                newName: "VideoUrl");

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "Videos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Videos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Videos",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TotalView",
                table: "Videos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TrailerUrl",
                table: "Videos",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "TotalView",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "TrailerUrl",
                table: "Videos");

            migrationBuilder.RenameColumn(
                name: "VideoUrl",
                table: "Videos",
                newName: "Url");
        }
    }
}
