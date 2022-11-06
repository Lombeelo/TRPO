using TRPO3.Models;

namespace TRPO3.Data;
public interface IScheduleTable
{
    bool SaveChanges();
    IEnumerable<ScheduleEntry> GetAllEntries();
    IEnumerable<ScheduleEntry> GetEntriesInDatesForGroup(DateTime startingDate, DateTime endingDate, Group group);
    IEnumerable<ScheduleEntry> GetEntriesInDatesForProfessor(DateTime startingDate, DateTime endingDate, Professor professor);
    ScheduleEntry GetScheduleEntryById(int Id);
    void CreateScheduleEntry(ScheduleEntry entry);

    IEnumerable<Professor> GetAllProfessors();
    Professor GetProfessorById(int id);
    void CreateProfessor(Professor professor);

    Subject GetSubjectById(int id);
    void CreateSubject(Subject subject);

    IEnumerable<Group> GetAllGroups();
    Group GetGroupById(int id);
    void CreateGroup(Group group);

    IEnumerable<LessonType> GetAllLessonTypes();
    LessonType GetLessonTypeById(int id);

    IEnumerable<int> GetParaAvailable(ScheduleEntryForm data);
    IEnumerable<Subject> GetSubjectsAvailable(ScheduleEntryForm data);
    IEnumerable<Professor> GetProfessorsAvailable(ScheduleEntryForm data);
    IEnumerable<Group> GetGroupsAvailable(ScheduleEntryForm data);
    IEnumerable<DateTime> GetDatesOccupied(ScheduleEntryForm data);
    IEnumerable<int> GetCabinetsOccupied(ScheduleEntryForm data);
    bool EditScheduleEntryFromForm(ScheduleEntryForm data);
    bool PostScheduleEntryFromForm(ScheduleEntryForm data);
    bool DeleteEntryById(int id);

}