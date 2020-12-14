using Microsoft.EntityFrameworkCore.Migrations;

namespace LocalManagement.Migrations
{
    public partial class addmanyrelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "districtId1",
                table: "Wards",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "cityId1",
                table: "Districts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Wards_districtId1",
                table: "Wards",
                column: "districtId1");

            migrationBuilder.CreateIndex(
                name: "IX_Districts_cityId1",
                table: "Districts",
                column: "cityId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Districts_Cities_cityId1",
                table: "Districts",
                column: "cityId1",
                principalTable: "Cities",
                principalColumn: "cityId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Wards_Districts_districtId1",
                table: "Wards",
                column: "districtId1",
                principalTable: "Districts",
                principalColumn: "districtId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Districts_Cities_cityId1",
                table: "Districts");

            migrationBuilder.DropForeignKey(
                name: "FK_Wards_Districts_districtId1",
                table: "Wards");

            migrationBuilder.DropIndex(
                name: "IX_Wards_districtId1",
                table: "Wards");

            migrationBuilder.DropIndex(
                name: "IX_Districts_cityId1",
                table: "Districts");

            migrationBuilder.DropColumn(
                name: "districtId1",
                table: "Wards");

            migrationBuilder.DropColumn(
                name: "cityId1",
                table: "Districts");
        }
    }
}
