using Microsoft.EntityFrameworkCore;
using TRPO3.Models;
namespace TRPO3.Data;
public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
    {
        // Return if database exists
        if (!Database.EnsureCreated()) return;
        //SeedData();
    }
    public DbSet<ScheduleEntry> Schedule { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<Professor> Professors { get; set; }
    public DbSet<Group> Groups { get; set; }
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

    void SeedData()
    {
        // Seeding data
        var gr = new Group { Id = 304 };
        var prof = new Professor
        {
            Id = 1,
            FullName = "Loh ebaniy"
        };
        var prof2 = new Professor
        {
            Id = 2,
            FullName = "Poluloh ebaniy"
        };
        var subj = new Subject
        {
            Id = 1,
            Name = "Physics"
        };
        var subj2 = new Subject
        {
            Id = 2,
            Name = "Math"
        };
        var ltype = new LessonType
        {
            Id = 1,
            Name = "Lecture"
        };
        prof.Subjects.Add(subj);
        prof2.Subjects.Add(subj);
        prof2.Subjects.Add(subj2);
        Subjects.Add(subj);
        Subjects.Add(subj2);
        Professors.Add(prof);
        Professors.Add(prof2);
        Schedule.Add(new ScheduleEntry
        {
            Id = 1,
            Date = DateTime.Now,
            Cabinet = 304,
            Para = 2,
            Groups = new List<Group> { gr },
            Professors = new List<Professor> { prof, prof2 },
            Subject = subj,
            SubjectId = subj.Id,
            Type = ltype
        });

        SaveChanges();
    }
}