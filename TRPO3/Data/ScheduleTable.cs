namespace TRPO3.Data;
public sealed class ScheduleTable : IScheduleTable
{
    private readonly AppDbContext _context;

    public ScheduleTable(AppDbContext context)
    {
        _context = context;
    }

    public AppDbContext GetContext()
    {
        return _context;
    }
}