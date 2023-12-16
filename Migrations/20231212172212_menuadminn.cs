using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace CellPhone.Migrations
{
    public partial class menuadminn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.CreateTable(
                name: "menuAdmin",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false),
                    Areas = table.Column<string>(type: "longtext", nullable: false),
                    ControllerName = table.Column<string>(type: "longtext", nullable: false),
                    ActionName = table.Column<string>(type: "longtext", nullable: false),
                    Link = table.Column<string>(type: "longtext", nullable: false),
                    MenuOrder = table.Column<int>(type: "int", nullable: false),
                    Position = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<int>(type: "int", nullable: false),
                    ParentMenuId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menuAdmin", x => x.ID);
                    table.ForeignKey(
                        name: "FK_menuAdmin_menuAdmin_ParentMenuId",
                        column: x => x.ParentMenuId,
                        principalTable: "menuAdmin",
                        principalColumn: "ID");
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_menuAdmin_ParentMenuId",
                table: "menuAdmin",
                column: "ParentMenuId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "menuAdmin");

           
        }
    }
}
