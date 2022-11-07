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
                Name = "ТРПО"
            },
            new Subject
            {
                Id = 2,
                Name = "Теория автоматического управления"
            },
            new Subject
            {
                Id = 3,
                Name = "Теория графов"
            },
            new Subject
            {
                Id = 4,
                Name = "Экология"
            },
            new Subject
            {
                Id = 5,
                Name = "Метрология, стандартизация и сертификация"
            },
            new Subject
            {
                Id = 6,
                Name = "Аналитическое моделирование"
            },
            new Subject
            {
                Id = 7,
                Name = "Архитектуры вычислительных систем"
            },
            new Subject
            {
                Id = 8,
                Name = "Основы менеджмента"
            },
            new Subject
            {
                Id = 9,
                Name = "Автоматизация проектирования"
            },
            new Subject
            {
                Id = 10,
                Name = "Эргономика и интерактивные системы АСОИУ"
            },
            new Subject
            {
                Id = 11,
                Name = "Базы данных"
            },
            new Subject
            {
                Id = 12,
                Name = "Интерфейсы периферийных устройств"
            },
            new Subject
            {
                Id = 13,
                Name = "Математическое программирование"
            },
            new Subject
            {
                Id = 14,
                Name = "Основы теории управления"
            },
            new Subject
            {
                Id = 15,
                Name = "Планирование эксперимента"
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

        var groups = new List<Group>
        {
            new Group {
                Id = 1,
                Name = "М3О-307Б-20",
                Subjects = new List<Subject> {
                    subjects[0],
                    subjects[1],
                    subjects[3],
                    subjects[4],
                    subjects[5],
                    subjects[6],
                    subjects[7],
                    subjects[9],
                    subjects[10],
                    subjects[14],
            } },
            new Group {
                Id = 2,
                Name = "М3О-309Б-20",
                Subjects = new List<Subject> {
                    subjects[0],
                    subjects[1],
                    subjects[2],
                    subjects[3],
                    subjects[4],
                    subjects[5],
                    subjects[6],
                    subjects[7],
                    subjects[8],
                    subjects[10],
                    subjects[11],
            } },
            new Group {
                Id = 3,
                Name = "М3О-310Б-20",
                Subjects = new List<Subject> {
                    subjects[0],
                    subjects[1],
                    subjects[3],
                    subjects[4],
                    subjects[5],
                    subjects[6],
                    subjects[7],
                    subjects[12],
                    subjects[13],
            } },
        };
        var profs = new List<Professor>
        {
            new Professor {
                Id = 1,
                Name = "Татарникова Елена Михайловна",
                Subjects = new List<Subject> {
                    subjects[0],
            } },
            new Professor {
                Id = 2,
                Name = "Прокимнова Татьяна Геннадьевна",
                Subjects = new List<Subject> {
                    subjects[0],
            } },
            new Professor {
                Id = 3,
                Name = "Мурсенков Павел Александрович",
                Subjects = new List<Subject> {
                    subjects[11],
                    subjects[5],
                    subjects[7],
            } },
            new Professor {
                Id = 4,
                Name = "Ткачёв Олег Алексеевич",
                Subjects = new List<Subject> {
                    subjects[10],
            } },
            new Professor {
                Id = 5,
                Name = "Брехов Олег Михайлович",
                Subjects = new List<Subject> {
                    subjects[5],
                    subjects[6],
            } },
            new Professor {
                Id = 6,
                Name = "Звонарёва Галина Александровна",
                Subjects = new List<Subject> {
                    subjects[6],
            } },
            new Professor {
                Id = 7,
                Name = "Макаренкова Надежда Алексеевна",
                Subjects = new List<Subject> {
                    subjects[1],
            } },
            new Professor {
                Id = 8,
                Name = "Романов Олег Тимофеевич",
                Subjects = new List<Subject> {
                    subjects[2],
            } },
            new Professor {
                Id = 9,
                Name = "Чечиков Юрий Борисович",
                Subjects = new List<Subject> {
                    subjects[9],
            } },
            new Professor {
                Id = 10,
                Name = "Сергеева Ирина Анатольевна",
                Subjects = new List<Subject> {
                    subjects[4],
            } },
            new Professor {
                Id = 11,
                Name = "Титов Юрий Павлович",
                Subjects = new List<Subject> {
                    subjects[14],
            } },
            new Professor {
                Id = 12,
                Name = "Давыдкина Елена Александровна",
                Subjects = new List<Subject> {
                    subjects[14],
            } },
            new Professor {
                Id = 13,
                Name = "Сотникова Елена Васильевна",
                Subjects = new List<Subject> {
                    subjects[3],
            } },
            new Professor {
                Id = 14,
                Name = "Гусилетов Александр Андреевич",
                Subjects = new List<Subject> {
                    subjects[3],
            } },
            new Professor {
                Id = 15,
                Name = "Ратников Максим Олегович",
                Subjects = new List<Subject> {
                    subjects[8],
            } },
            new Professor {
                Id = 16,
                Name = "Григоревский Николай Владимирович",
                Subjects = new List<Subject> {
                    subjects[12],
            } },
            new Professor {
                Id = 17,
                Name = "Кудрявцев Павел Сергеевич",
                Subjects = new List<Subject> {
                    subjects[13],
            } },
            new Professor {
                Id = 18,
                Name = "Костыгова Людмила Александровна",
                Subjects = new List<Subject> {
                    subjects[7],
            } },
            new Professor {
                Id = 19,
                Name = "Латыпов Эдгар Рашитович",
                Subjects = new List<Subject> {
                    subjects[7],
            } },
        };

        Subjects.AddRange(subjects);
        LessonTypes.AddRange(ltypes);
        Groups.AddRange(groups);
        Professors.AddRange(profs);
        SaveChanges();
    }
}