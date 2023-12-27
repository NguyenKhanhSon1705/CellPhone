using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CellPhone.Migrations
{
    public partial class priceOld : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PriceOld",
                table: "Product",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceOld",
                table: "Product");
        }
    }
}
