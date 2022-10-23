using Microsoft.EntityFrameworkCore;
using TRPO3.Models;
namespace TRPO3.Data;
public sealed class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> opt) : base(opt)
    {
        // Return if database exists
        if (!Database.EnsureCreated()) return;
        SeedData();
    }
    public DbSet<ScheduleEntry> Schedule { get; set; }
    public DbSet<Subject> Subjects { get; set; }
    public DbSet<Professor> Professors { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<LessonType> LessonTypes { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Professor>()
            .HasMany(p => p.Subjects)
            .WithMany(p => p.Professors);
        modelBuilder
            .Entity<Group>()
            .HasMany(p => p.Subjects)
            .WithMany(p => p.Groups);
        modelBuilder
            .Entity<ScheduleEntry>()
            .HasOne(p => p.Subject)
            .WithMany();
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
        var subjects = new List<Subject>
        {
            new Subject
            {
                Name = "Теория графов"
            },
            new Subject
            {
                Name = "САПР"
            }
        };
        var ltypes = new List<LessonType>
        {
            new LessonType
            {
                Name = "ЛК"
            },
            new LessonType
            {
                Name = "ПЗ"
            },
            new LessonType
            {
                Name = "ЛР"
            },
        };

        var groups = new List<Group> {
            new Group
            {
                Name = "М3О-309Б-20",
                Subjects = subjects
            },
            new Group
            {
                Name = "М3О-307Б-20"
            },
            new Group
            {
                Name = "М3О-310Б-20"
            }
        };
        var profs = new List<Professor>
        {
            new Professor
            {
                FullName = "Ратников"
            },
            new Professor
            {
                FullName = "Чугаев"
            }
        };



        profs[0].Subjects.Add(subjects[0]);
        profs[1].Subjects.Add(subjects[0]);
        profs[1].Subjects.Add(subjects[1]);

        Groups.AddRange(groups);
        Subjects.AddRange(subjects);
        Professors.AddRange(profs);
        LessonTypes.AddRange(ltypes);

        Schedule.Add(new ScheduleEntry
        {
            Id = 1,
            Date = DateTime.Now,
            Cabinet = 304,
            Para = 2,
            Groups = new List<Group> { groups[0] },
            Professors = new List<Professor> { profs[0], profs[1] },
            Subject = subjects[0],
            Type = ltypes[0]
        });

        SaveChanges();
    }
}