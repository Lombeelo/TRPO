public sealed class ScheduleTable : IScheduleTable
{
    private readonly AppDbContext _context;

    public ScheduleTable(AppDbContext context)
    {
        _context = context;
    }
}