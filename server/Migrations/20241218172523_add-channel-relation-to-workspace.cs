using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class addchannelrelationtoworkspace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkspaceId",
                table: "WorkspaceChannels",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WorkspaceChannels_WorkspaceId",
                table: "WorkspaceChannels",
                column: "WorkspaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkspaceChannels_Workspaces_WorkspaceId",
                table: "WorkspaceChannels",
                column: "WorkspaceId",
                principalTable: "Workspaces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkspaceChannels_Workspaces_WorkspaceId",
                table: "WorkspaceChannels");

            migrationBuilder.DropIndex(
                name: "IX_WorkspaceChannels_WorkspaceId",
                table: "WorkspaceChannels");

            migrationBuilder.DropColumn(
                name: "WorkspaceId",
                table: "WorkspaceChannels");
        }
    }
}
