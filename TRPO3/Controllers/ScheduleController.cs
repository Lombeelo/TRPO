using Microsoft.AspNetCore.Mvc;

namespace TRPO3.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ScheduleController : ControllerBase
{
    private readonly IScheduleTable _table;

    public ScheduleController(IScheduleTable table)
    {
        _table = table;
    }

    [HttpGet]
    public IEnumerable<Professor> Get()
    {
        return new List<Professor> {new Professor
        {
            Id = 1,
            FullName = "hui huich"
        },
        new Professor
        {
            Id = 2,
            FullName = "Eblan eblanich"
        }};
    }
}