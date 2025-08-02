/*
  # Add AI Chat System Tables

  1. New Tables
    - `ChatConversations`
      - `Id` (int, primary key)
      - `UserId` (nvarchar, foreign key)
      - `Title` (nvarchar, default 'New Conversation')
      - `CreatedAt` (datetime2, default now)
      - `LastMessageAt` (datetime2, default now)
      - `IsActive` (bit, default true)

    - `ChatMessages`
      - `Id` (int, primary key)
      - `ConversationId` (int, foreign key)
      - `Role` (int, enum: User=0, Assistant=1, System=2)
      - `Content` (nvarchar)
      - `CreatedAt` (datetime2, default now)
      - `TokenCount` (int, nullable)
      - `Metadata` (nvarchar, nullable, for JSON data)

  2. Relationships
    - ChatConversations belong to User (ApplicationUser)
    - ChatMessages belong to ChatConversation

  3. Indexes
    - Index on UserId for ChatConversations
    - Index on ConversationId for ChatMessages
    - Index on CreatedAt for both tables
*/

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Netflix.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddChatTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChatConversations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false, defaultValue: "New Conversation"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    LastMessageAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatConversations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatConversations_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChatMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ConversationId = table.Column<int>(type: "int", nullable: false),
                    Role = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    TokenCount = table.Column<int>(type: "int", nullable: true),
                    Metadata = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatMessages_ChatConversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "ChatConversations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Create indexes for better performance
            migrationBuilder.CreateIndex(
                name: "IX_ChatConversations_UserId",
                table: "ChatConversations",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatConversations_CreatedAt",
                table: "ChatConversations",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_ChatConversations_LastMessageAt",
                table: "ChatConversations",
                column: "LastMessageAt");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_ConversationId",
                table: "ChatMessages",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_CreatedAt",
                table: "ChatMessages",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_ChatMessages_Role",
                table: "ChatMessages",
                column: "Role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatMessages");

            migrationBuilder.DropTable(
                name: "ChatConversations");
        }
    }
}