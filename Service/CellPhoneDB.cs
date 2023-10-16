using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class CellPhoneDB : IdentityDbContext<AppUserModel>
{
    public CellPhoneDB(DbContextOptions<CellPhoneDB> options) : base(options)
    {
    }
    protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
    {
        base.OnConfiguring(dbContextOptionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            var tableName = entityType.GetTableName();
            if (tableName.StartsWith("AspNet"))
            {
                entityType.SetTableName(tableName.Substring(6));
            }
        }
    }
    public DbSet<ContactModel> contacts { get; set; }
    // public DbSet<MenuAdminModel> menuAdmin {get; set;}

}