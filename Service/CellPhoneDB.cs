using Microsoft.EntityFrameworkCore;

public class CellPhoneDB : DbContext
{
    public CellPhoneDB(DbContextOptions<CellPhoneDB> options) : base(options)
    {
    }
    protected override void OnConfiguring (DbContextOptionsBuilder dbContextOptionsBuilder){
        base.OnConfiguring(dbContextOptionsBuilder);
    } 
    protected override void OnModelCreating(ModelBuilder modelBuilder){
        base.OnModelCreating(modelBuilder);
    }
    public DbSet<ContactModel> contacts {get; set;}
    // public DbSet<MenuAdminModel> menuAdmin {get; set;}
    
}