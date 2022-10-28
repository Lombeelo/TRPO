using Microsoft.EntityFrameworkCore;
using TRPO3.Models;

namespace TRPO3.Data;
public sealed class ScheduleTable : IScheduleTable
{
    private readonly AppDbContext _context;

    public ScheduleTable(AppDbContext context)
    {
        _context = context;
    }

    public void CreateGroup(Group group)
    {
        if (group is null)
        {
            throw new ArgumentNullException(nameof(group));
        }
        _context.Groups.Add(group);
    }

    public void CreateProfessor(Professor professor)
    {
        if (professor is null)
        {
            throw new ArgumentNullException(nameof(professor));
        }
        _context.Professors.Add(professor);
    }

    public void CreateScheduleEntry(ScheduleEntry entry)
    {
        if (entry is null)
        {
            throw new ArgumentNullException(nameof(entry));
        }
        _context.Schedule.Add(entry);
    }

    public void CreateSubject(Subject subject)
    {
        if (subject is null)
        {
            throw new ArgumentNullException(nameof(subject));
        }
        _context.Subjects.Add(subject);
    }

    IEnumerable<ScheduleEntry> GetAllEntriesLazy()
    {
        return _context.Schedule
            .Include(p => p.Groups)
            .Include(p => p.Professors)
            .Include(p => p.Subject)
            .Include(p => p.Type)
            .OrderBy(p => p.Id);
    }

    public IEnumerable<ScheduleEntry> GetAllEntries()
    {
        return GetAllEntriesLazy().ToList();
    }

    public IEnumerable<Group> GetAllGroups()
    {
        return _context.Groups.ToList();
    }
    IEnumerable<Professor> GetAllProfessorsLazy()
    {
        return _context.Professors.Include(p => p.Subjects);
    }
    public IEnumerable<Professor> GetAllProfessors()
    {
        return GetAllProfessorsLazy().ToList();
    }

    IEnumerable<Subject> GetAllSubjectsLazy()
    {
        return _context.Subjects
            .Include(s => s.Professors)
            .OrderBy(s => s.Id);
    }

    public IEnumerable<Subject> GetAllSubjects()
    {
        return GetAllSubjectsLazy().ToList();
    }

    public AppDbContext GetContext()
    {
        return _context;
    }

    IEnumerable<ScheduleEntry> GetEntriesInDatesLazy(DateTime startingDate, DateTime endingDate)
    {
        return GetAllEntriesLazy()
            .Where(e => e.Date.Date >= startingDate.Date && e.Date.Date <= endingDate.Date);
    }

    public IEnumerable<ScheduleEntry> GetEntriesInDates(DateTime startingDate, DateTime endingDate)
    {
        return GetEntriesInDatesLazy(startingDate, endingDate).ToList();
    }

    public IEnumerable<ScheduleEntry> GetEntriesInDatesForGroup(DateTime startingDate, DateTime endingDate, Group group)
    {
        return GetEntriesInDatesLazy(startingDate, endingDate).Where(e => e.Groups.Contains(group)).ToList();
    }

    public IEnumerable<ScheduleEntry> GetEntriesInDatesForProfessor(DateTime startingDate, DateTime endingDate, Professor professor)
    {
        return GetEntriesInDatesLazy(startingDate, endingDate).Where(e => e.Professors.Contains(professor)).ToList();
    }

    public IEnumerable<ScheduleEntry> GetScheduleEntriesByDate(DateTime date)
    {
        return GetAllEntriesLazy().Where(e => e.Date.Date == date.Date).ToList();
    }

    public Group GetGroupById(int id)
    {
        return _context.Groups.Where(g => g.Id == id).FirstOrDefault();
    }

    public Professor GetProfessorById(int id)
    {
        return GetAllProfessorsLazy().Where(p => p.Id == id).FirstOrDefault();
    }

    public IEnumerable<Professor> GetProfessorsBySubject(Subject subject)
    {
        return GetAllProfessorsLazy().Where(p => p.Subjects.Contains(subject));
    }

    public ScheduleEntry GetScheduleEntryById(int id)
    {
        return GetAllEntriesLazy().Where(e => e.Id == id).FirstOrDefault();
    }

    public Subject GetSubjectByName(string name)
    {
        return GetAllSubjectsLazy().Where(p => p.Name == name).FirstOrDefault();
    }

    public IEnumerable<Subject> GetSubjectsByProfessor(Professor prof)
    {
        return GetAllSubjectsLazy().Where(p => p.Professors.Contains(prof));
    }

    public bool SaveChanges()
    {
        return _context.SaveChanges() >= 0;
    }

    public IEnumerable<LessonType> GetAllLessonTypes()
    {
        return _context.LessonTypes.OrderBy(s => s.Id).ToList();
    }

    public IEnumerable<ScheduleEntry> TrimGroupSubjectLazy(IQueryable<ScheduleEntry> query, ScheduleEntryCreateForm data)
    {
        var items = query;
        if (data.GroupIds.Any())
        {
            items = items.Where(i => i.Groups.IntersectBy(data.GroupIds, p => p.Id).Any());
            if (data.SubjectId is int subjId)
            {
                items = items.Where(i => i.Groups.Any(p => p.Subjects.Any(p => p.Id == subjId)));
            }
        }
        return items;
    }

    public IEnumerable<ScheduleEntry> TrimProfessorSubjectLazy(IQueryable<ScheduleEntry> query, ScheduleEntryCreateForm data)
    {
        var items = query;
        if (data.ProfessorIds.Any())
        {
            items = items.Where(i => i.Professors.IntersectBy(data.ProfessorIds, p => p.Id).Any());
            if (data.SubjectId is int subjId)
            {
                items = items.Where(i => i.Professors.Any(p => p.Subjects.Any(p => p.Id == subjId)));
            }
        }
        return items;
    }


    public IEnumerable<LessonType> GetSubjectTypeAvailable(ScheduleEntryCreateForm data)
    {
        return GetAllLessonTypes();
    }



    public IEnumerable<Subject> GetSubjectsAvailable(ScheduleEntryCreateForm data)
    {
        // Group or Professor were already selected
        var items = _context.Subjects.AsQueryable();
        if (data.ProfessorIds.Any())
        {
            // Subjects which professors know
            items = items.Where(s => s.Professors.Any(p => data.ProfessorIds.Contains(p.Id)));
        }
        if (data.GroupIds.Any())
        {
            // Subjects wich groups study
            items = items.Where(s => s.Groups.Any(p => data.GroupIds.Contains(p.Id)));
        }

        return items;
    }

    public IEnumerable<Professor> GetProfessorsAvailable(ScheduleEntryCreateForm data)
    {
        var items = _context.Professors.AsQueryable();

        if (data.ProfessorIds.Any())
        {
            // Professors whose Subjects intersection is not empty
            items = items.Where(p => p.Subjects.Any(s => s.Professors.Any(g => data.ProfessorIds.Contains(g.Id))));
        }

        if (data.GroupIds.Any())
        {
            //choose professors who has at least one subject same as chosen groups
            items = items.Where(p => p.Subjects.Any(s => s.Groups.Any(g => data.GroupIds.Contains(g.Id))));

            if (data.SubjectId is int subjId)
            {
                // Professors who know subject
                items = items.Where(p => p.Subjects.Any(s => data.SubjectId == s.Id));
            }
        }

        return items;
    }

    public IEnumerable<Group> GetGroupsAvailable(ScheduleEntryCreateForm data)
    {
        var items = _context.Groups.AsQueryable();

        if (data.GroupIds.Any())
        {
            var groups = items.Where(
                        g => data.GroupIds.Contains(g.Id)
                    ).ToList();
            // Groups whose Subjects intersection is not empty
            items = items.Where(
                g => g.Subjects.Any(
                    s => groups.Any(g2 => g2.Subjects.Contains(s))
                )
            );
        }

        if (data.ProfessorIds.Any())
        {
            //choose Groups who has at least one subject same as chosen professors
            items = items.Where(g => g.Subjects.Any(s => s.Professors.Any(p => data.ProfessorIds.Contains(p.Id))));

            if (data.SubjectId is int subjId)
            {
                // Groups who study subject
                items = items.Where(g => g.Subjects.Any(s => data.SubjectId == s.Id));
            }
        }

        return items;
    }

    public IEnumerable<DateTime> GetDatesOccupied(ScheduleEntryCreateForm data)
    {
        // Group || Professor already chosen
        var items = _context.Schedule.AsQueryable();
        // Date are occupied when Groups or Proffessors have 4 paras in single day

        return items.GroupBy(p => p.Date.Date, p => new
        {
            para = p.Para,
            groups = p.Groups.Where(g => data.GroupIds.Contains(g.Id)),
            profs = p.Professors.Where(g => data.ProfessorIds.Contains(g.Id))
        },
        (date, objs) => new
        {
            Key = date,
            Groups = objs.Select(o => o.groups).Aggregate((initial, step) => initial.Concat(step).ToList())
                        .GroupBy(p => p.Id, (id, Groups) => Groups.Count()).Any(c => c >= 4),
            Professors = objs.Select(o => o.profs).Aggregate((initial, step) => initial.Concat(step).ToList())
                        .GroupBy(p => p.Id, (id, Professors) => Professors.Count()).Any(c => c >= 4)
        })
        .Where(d => d.Groups || d.Professors).Select(o => o.Key);
    }

    public IEnumerable<int> GetParaAvailable(ScheduleEntryCreateForm data)
    {
        if (data.Date is DateTime date)
        {
            var items = _context.Schedule.AsQueryable();
            var TotalParas = new List<int> { 1, 2, 3, 4, 5, 6 };
            return TotalParas.Except(items.Where(i => i.Date.Date == date.Date
                && (i.Groups.Any(g => data.GroupIds.Contains(g.Id))
                || i.Professors.Any(p => data.ProfessorIds.Contains(p.Id))))
                .Select(i => i.Para));
        }
        // Date and group || prof was selected => нужно отсеять занятые пары
        return Array.Empty<int>();
    }

    public IEnumerable<int> GetCabinetsOccupied(ScheduleEntryCreateForm data)
    {
        if (data.Date is DateTime date)
        {
            var items = _context.Schedule.AsQueryable();
            return items.Where(i => i.Date.Date == date.Date).Select(i => i.Cabinet).Distinct();
        }
        return Array.Empty<int>();
    }

    public bool PostScheduleEntryFromForm(ScheduleEntryCreateForm data)
    {
        if (data.Date is DateTime date
            && data.Cabinet is int cab
            && data.Para is int para
            && data.SubjectId is int subjID
            && data.GroupIds.Any()
            && data.ProfessorIds.Any()
            && data.SubjectTypeId is int typeId)
        {
            var entry = new ScheduleEntry
            {
                Date = date.Date,
                Cabinet = cab,
                Para = para,
                Subject = _context.Subjects.Where(s => s.Id == subjID).FirstOrDefault(),
                Groups = _context.Groups.Where(g => data.GroupIds.Contains(g.Id)).ToList(),
                Professors = _context.Professors.Where(p => data.ProfessorIds.Contains(p.Id)).ToList(),
                Type = _context.LessonTypes.FirstOrDefault(l => l.Id == typeId)
            };
            _context.Schedule.Add(entry);
            SaveChanges();
            return true;
        }
        return false;
    }

    public bool EditScheduleEntryFromFormAndId(int id, ScheduleEntryCreateForm data)
    {
        throw new NotImplementedException();
    }
}