using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class conversationid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConversationId",
                table: "Chats",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Conversations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Receiver = table.Column<int>(type: "integer", nullable: false),
                    Sender = table.Column<int>(type: "integer", nullable: false),
                    SenderUserId = table.Column<int>(type: "integer", nullable: false),
                    ReceiverUserId = table.Column<int>(type: "integer", nullable: false),
                    WorkspaceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Conversations_Users_ReceiverUserId",
                        column: x => x.ReceiverUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Conversations_Users_SenderUserId",
                        column: x => x.SenderUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Conversations_Workspaces_WorkspaceId",
                        column: x => x.WorkspaceId,
                        principalTable: "Workspaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Chats_ConversationId",
                table: "Chats",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_ReceiverUserId",
                table: "Conversations",
                column: "ReceiverUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_SenderUserId",
                table: "Conversations",
                column: "SenderUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Conversations_WorkspaceId",
                table: "Conversations",
                column: "WorkspaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Conversations_ConversationId",
                table: "Chats",
                column: "ConversationId",
                principalTable: "Conversations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Conversations_ConversationId",
                table: "Chats");

            migrationBuilder.DropTable(
                name: "Conversations");

            migrationBuilder.DropIndex(
                name: "IX_Chats_ConversationId",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "ConversationId",
                table: "Chats");
        }
    }
}
