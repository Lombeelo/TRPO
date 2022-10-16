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

    // Example request
    // https://localhost:7197/api/schedule
    [HttpGet]
    public ActionResult<IEnumerable<ScheduleEntryReadDto>> GetSchedule()
    {
        Console.WriteLine("-----> Got to GetSchedule method");
        var items = _table.GetAllEntries();
        return Ok(_mapper.Map<IEnumerable<ScheduleEntryReadDto>>(items));
    }

    // Example request
    // https://localhost:7197/api/schedule/GetScheduleBetweenDates?beginDate=MM-dd-yyyy&endDate=MM-dd-yyyy
    [HttpGet, Route("GetScheduleBetweenDates")]
    public ActionResult<IEnumerable<ScheduleEntryReadDto>> GetScheduleBetweenDates(DateTime beginDate, DateTime endDate)
    {
        Console.WriteLine($"-----> Got to GetScheduleBetweenDates method, args are {beginDate} and {endDate}");
        var items = _table.GetEntriesInDates(beginDate, endDate);
        return Ok(_mapper.Map<IEnumerable<ScheduleEntryReadDto>>(items));
    }
}

