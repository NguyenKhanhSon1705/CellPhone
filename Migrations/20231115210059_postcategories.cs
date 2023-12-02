using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CellPhone.Migrations
{
    public partial class postcategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.AddColumn<string>(
                name: "uuid",
                type: "varchar",
                table: "post",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
             
        }
    }
}
