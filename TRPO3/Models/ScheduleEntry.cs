public sealed class ScheduleEntry
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Para { get; set; }
    public int Cabinet { get; set; }
    public int SubjectId { get; set; }
    public Subject Subject { get; set; }
    public LessonType Type { get; set; }
    public ICollection<int> Groups { get; set; } = new List<int>();
    public ICollection<Professor> Professor { get; set; } = new List<Professor>();
}
