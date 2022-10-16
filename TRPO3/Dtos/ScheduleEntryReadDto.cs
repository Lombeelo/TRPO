namespace TRPO3.Dtos;
public sealed class ScheduleEntryReadDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Para { get; set; }
    public int Cabinet { get; set; }
    public ScheduleSubjectReadDto Subject { get; set; }
    public ScheduleLessonTypeReadDto Type { get; set; }
    public ICollection<ScheduleGroupReadDto> Groups { get; set; } = new List<ScheduleGroupReadDto>();
    public ICollection<ScheduleProfessorReadDto> Professors { get; set; } = new List<ScheduleProfessorReadDto>();
}
