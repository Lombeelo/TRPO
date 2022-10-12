namespace TRPO3.Models;
public sealed class ScheduleEntry
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Para { get; set; }
    public int Cabinet { get; set; }
    public int SubjectId { get; set; }
    public Subject Subject { get; set; }
    public LessonType Type { get; set; }
    public ICollection<Group> Groups { get; set; } = new List<Group>();
    public ICollection<Professor> Professors { get; set; } = new List<Professor>();
}
