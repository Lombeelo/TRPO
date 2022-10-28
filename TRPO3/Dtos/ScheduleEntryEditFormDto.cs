using TRPO3.Models;

namespace TRPO3.Dtos;
public sealed class ScheduleEntryEditForm
{
    public int Id { get; set; }
    public ScheduleEntryCreateForm Form { get; set; }
}