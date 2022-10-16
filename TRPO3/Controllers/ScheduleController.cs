using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TRPO3.Data;
using TRPO3.Models;
using TRPO3.Dtos;

namespace TRPO3.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ScheduleController : ControllerBase
{
    private readonly IScheduleTable _table;
    private readonly IMapper _mapper;
    public ScheduleController(IScheduleTable table, IMapper mapper)
    {
        _table = table;
        _mapper = mapper;
    }

    [HttpGet]
    public ActionResult<ScheduleEntryReadDto> Get()
    {
        var item = _table.GetContext()
            .Schedule
            .Include(p => p.Groups)
            .Include(p => p.Professors)
            .Include(p => p.Subject)
            .Include(p => p.Type)
            .OrderBy(p => p.Id)
            .FirstOrDefault();
        return Ok(new ScheduleEntryReadDto());

    }
}

