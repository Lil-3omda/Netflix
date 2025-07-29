using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Netflix.API.Migrations
{
    /// <inheritdoc />
    public partial class addingSoftDeleteToCategoryModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
            name: "IsDeleted",
            table: "Categories",
            type: "bit",
            nullable: false,
            defaultValue: false);



        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
           
        }
    }
}
