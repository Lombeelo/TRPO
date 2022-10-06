public sealed class ScheduleEntry
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public LessonType Type { get; set; }
    public int LessonNumber { get; set; }
    public int Cabinet { get; set; }
    public Professor Professor { get; set; }
    public Subject Subject { get; set; }
}
