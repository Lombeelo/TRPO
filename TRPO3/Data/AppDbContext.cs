using Microsoft.EntityFrameworkCore;

public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
    {

    }
    public DbSet<ScheduleEntry> Schedule { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<Professor> Professors { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Professor>()
            .HasMany(p => p.Subjects)
            .WithOne();
        modelBuilder
            .Entity<ScheduleEntry>()
            .Property(p => p.Type)
            .HasConversion<string>();
    }
}