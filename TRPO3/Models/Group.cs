namespace TRPO3.Models;
public sealed class Group
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Subject> Subjects { get; set; } = new List<Subject>();
    public ICollection<ScheduleEntry> ScheduleEntries { get; set; } = new List<ScheduleEntry>();
}