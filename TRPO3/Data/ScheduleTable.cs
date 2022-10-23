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
}