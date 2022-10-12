using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TRPO3.Data;
using TRPO3.Models;

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
    public ScheduleEntry Get()
    {
        return _table.GetContext().Schedule.FirstOrDefault();
    }
}