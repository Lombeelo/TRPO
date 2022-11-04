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
                Id = 1,
                Name = "Теория графов"
            },
            new Subject
            {
                Id = 2,
                Name = "САПР"
            },
            new Subject
            {
                Id = 3,
                Name = "ТРПО"
            },
            new Subject
            {
                Id = 4,
                Name = "Математический анализ"
            },
        };
        var ltypes = new List<LessonType>
        {
            new LessonType
            {
                Id = 1,
                Name = "ЛК"
            },
            new LessonType
            {
                Id = 2,
                Name = "ПЗ"
            },
            new LessonType
            {
                Id = 3,
                Name = "ЛР"
            },
        };

        var groups = new List<Group> {
            new Group
            {
                Id = 1,
                Name = "М3О-309Б-20",
                Subjects = subjects
            },
            new Group
            {
                Id = 2,
                Name = "М3О-307Б-20",
                Subjects = subjects.Skip(2).ToList()
            },
            new Group
            {
                Id = 3,
                Name = "М3О-310Б-20",
                Subjects = subjects.Take(2).ToList()
            }
        };
        var profs = new List<Professor>
        {
            new Professor
            {
                Id = 1,
                Name = "Ратников М.О.",
                Subjects = subjects.Skip(1).Take(2).ToList() // 2,3
            },
            new Professor
            {
                Id = 2,
                Name = "Чугаев Б.Н.",
                Subjects = subjects.Take(1).ToList() // 1
            },
            new Professor
            {
                Id = 3,
                Name = "Вестяк А.В.",
                Subjects = subjects.Skip(3).ToList() // 4
            }

        };

        Groups.AddRange(groups);
        Subjects.AddRange(subjects);
        Professors.AddRange(profs);
        LessonTypes.AddRange(ltypes);

        Schedule.AddRange(new List<ScheduleEntry> {
            new ScheduleEntry {
                Id = 1,
                Date = DateTime.Today,
                Cabinet = 304,
                Para = 2,
                Groups = new List<Group> { groups[0] },
                Professors = new List<Professor> { profs[0], profs[1] },
                Subject = subjects[0],
                Type = ltypes[2]
            },
            new ScheduleEntry {
                Id = 2,
                Date = DateTime.Today.AddDays(-1),
                Cabinet = 504,
                Para = 3,
                Subject = subjects.Last(),
                Groups = groups.Take(2).ToList(),
                Professors = profs.Skip(2).ToList(),
                Type = ltypes[0]
            },
            new ScheduleEntry {
                Id = 3,
                Date = DateTime.Today.AddDays(1),
                Cabinet = 108,
                Para = 3,
                Subject = subjects.Skip(1).Take(1).ToArray()[0],
                Groups = new List<Group> {groups[0]},
                Professors = new List<Professor> {profs[1]},
                Type = ltypes[1]
            }
        });

        SaveChanges();
    }
}