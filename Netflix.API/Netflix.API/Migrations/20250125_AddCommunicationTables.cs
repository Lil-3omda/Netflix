/*
  # Add Communication System Tables

  1. New Tables
    - `Conversations`
      - `Id` (int, primary key)
      - `Subject` (nvarchar)
      - `Status` (int, enum)
      - `CreatedAt` (datetime2)
      - `LastMessageAt` (datetime2, nullable)
      - `CustomerId` (nvarchar, foreign key)
      - `AssignedAdminId` (nvarchar, foreign key, nullable)
      - `CustomerEmail` (nvarchar, nullable)
      - `CustomerName` (nvarchar, nullable)
      - `Priority` (nvarchar, default 'Normal')

    - `Messages`
      - `Id` (int, primary key)
      - `Content` (nvarchar)
      - `Type` (int, enum)
      - `Status` (int, enum, default 0)
      - `CreatedAt` (datetime2, default now)
      - `ReadAt` (datetime2, nullable)
      - `SenderId` (nvarchar, foreign key, nullable)
      - `ReceiverId` (nvarchar, foreign key, nullable)
      - `ConversationId` (int, foreign key)
      - `AttachmentUrl` (nvarchar, nullable)
      - `AttachmentType` (nvarchar, nullable)

  2. Relationships
    - Conversations belong to Customer (ApplicationUser)
    - Conversations can be assigned to Admin (ApplicationUser)
    - Messages belong to Conversation
    - Messages have Sender and Receiver (ApplicationUser)

  3. Indexes
    - Index on ConversationId for Messages
    - Index on CustomerId for Conversations
    - Index on AssignedAdminId for Conversations
    - Index on SenderId and ReceiverId for Messages
*/

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Netflix.API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCommunicationTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Conversations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Subject = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    LastMessageAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CustomerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AssignedAdminId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CustomerEmail = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    CustomerName = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    Priority = table.Column<string>(type: "nvarchar(50)", nullable: false, defaultValue: "Normal")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conversations_AspNetUsers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Conversations_AspNetUsers_AssignedAdminId",
                        column: x => x.AssignedAdminId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    ReadAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SenderId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReceiverId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ConversationId = table.Column<int>(type: "int", nullable: false),
                    AttachmentUrl = table.Column<string>(type: "nvarchar(1000)", nullable: true),
                    AttachmentType = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Messages_AspNetUsers_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Messages_Conversations_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "Conversations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Create indexes for better performance
            migrationBuilder.CreateIndex(
                name: "IX_Conversations_CustomerId",
                table: "Conversations",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_AssignedAdminId",
                table: "Conversations",
                column: "AssignedAdminId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_Status",
                table: "Conversations",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_CreatedAt",
                table: "Conversations",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ConversationId",
                table: "Messages",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReceiverId",
                table: "Messages",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_Status",
                table: "Messages",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_CreatedAt",
                table: "Messages",
                column: "CreatedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Conversations");
        }
    }
}