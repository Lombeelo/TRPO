using Microsoft.EntityFrameworkCore;
using TRPO3.Models;
namespace TRPO3.Data;
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
            .WithMany(p => p.Professors);
        modelBuilder
            .Entity<ScheduleEntry>()
            .HasOne(p => p.Subject)
            .WithMany()
            .HasForeignKey(p => p.SubjectId);
        modelBuilder
            .Entity<ScheduleEntry>()
            .HasMany(p => p.Groups)
            .WithMany(p => p.ScheduleEntries);
        modelBuilder
            .Entity<ScheduleEntry>()
            .HasMany(p => p.Professors)
            .WithMany(p => p.ScheduleEntries);
    }
}