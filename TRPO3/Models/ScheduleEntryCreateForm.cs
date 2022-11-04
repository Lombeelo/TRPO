namespace TRPO3.Models;
public sealed class ScheduleEntryForm
{
    public int? EditingEntryId { get; set; }
    public DateTime? Date { get; set; }
    public int? Para { get; set; }
    public int? Cabinet { get; set; }
    public int? SubjectId { get; set; }
    public int? SubjectTypeId { get; set; }
    public ICollection<int> GroupIds { get; set; } = Array.Empty<int>();
    public ICollection<int> ProfessorIds { get; set; } = Array.Empty<int>();
}
