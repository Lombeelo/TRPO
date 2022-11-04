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
    Subject GetSubjectById(int id);
    void CreateSubject(Subject subject);

    IEnumerable<Group> GetAllGroups();
    Group GetGroupById(int id);
    void CreateGroup(Group group);

    IEnumerable<LessonType> GetAllLessonTypes();
    LessonType GetLessonTypeById(int id);

    IEnumerable<LessonType> GetSubjectTypeAvailable(ScheduleEntryForm data);
    IEnumerable<int> GetParaAvailable(ScheduleEntryForm data);
    IEnumerable<Subject> GetSubjectsAvailable(ScheduleEntryForm data);
    IEnumerable<Professor> GetProfessorsAvailable(ScheduleEntryForm data);
    IEnumerable<Group> GetGroupsAvailable(ScheduleEntryForm data);
    IEnumerable<DateTime> GetDatesOccupied(ScheduleEntryForm data);
    IEnumerable<int> GetCabinetsOccupied(ScheduleEntryForm data);
    ScheduleEntryForm GetFormByEntryId(int Id);
    bool EditScheduleEntryFromForm(ScheduleEntryForm data);
    bool PostScheduleEntryFromForm(ScheduleEntryForm data);

}