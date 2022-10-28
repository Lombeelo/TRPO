using TRPO3.Models;

namespace TRPO3.Data;
public interface IScheduleTable
{
    AppDbContext GetContext();
    bool SaveChanges();
    IEnumerable<ScheduleEntry> GetAllEntries();
    IEnumerable<ScheduleEntry> GetEntriesInDates(DateTime startingDate, DateTime endingDate);
    IEnumerable<ScheduleEntry> GetEntriesInDatesForGroup(DateTime startingDate, DateTime endingDate, Group group);
    IEnumerable<ScheduleEntry> GetEntriesInDatesForProfessor(DateTime startingDate, DateTime endingDate, Professor professor);
    IEnumerable<ScheduleEntry> GetScheduleEntriesByDate(DateTime date);
    ScheduleEntry GetScheduleEntryById(int Id);
    void CreateScheduleEntry(ScheduleEntry entry);

    IEnumerable<Professor> GetAllProfessors();
    IEnumerable<Professor> GetProfessorsBySubject(Subject subject);
    Professor GetProfessorById(int id);
    void CreateProfessor(Professor professor);

    IEnumerable<Subject> GetAllSubjects();
    IEnumerable<Subject> GetSubjectsByProfessor(Professor prof);
    Subject GetSubjectByName(string name);
    void CreateSubject(Subject subject);

    IEnumerable<Group> GetAllGroups();
    Group GetGroupById(int id);
    void CreateGroup(Group group);

    IEnumerable<LessonType> GetAllLessonTypes();

    IEnumerable<LessonType> GetSubjectTypeAvailable(ScheduleEntryCreateForm data);
    IEnumerable<int> GetParaAvailable(ScheduleEntryCreateForm data);
    IEnumerable<Subject> GetSubjectsAvailable(ScheduleEntryCreateForm data);
    IEnumerable<Professor> GetProfessorsAvailable(ScheduleEntryCreateForm data);
    IEnumerable<Group> GetGroupsAvailable(ScheduleEntryCreateForm data);
    IEnumerable<DateTime> GetDatesOccupied(ScheduleEntryCreateForm data);
    IEnumerable<int> GetCabinetsOccupied(ScheduleEntryCreateForm data);
    bool EditScheduleEntryFromFormAndId(int id, ScheduleEntryCreateForm data);
    bool PostScheduleEntryFromForm(ScheduleEntryCreateForm data);

}