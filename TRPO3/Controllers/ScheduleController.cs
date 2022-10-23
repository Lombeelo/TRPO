using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TRPO3.Data;
using TRPO3.Models;
using TRPO3.Dtos;
using System.Text.Json;

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

    private void LogMethodInfo<T>(T? data)
    {
        Console.WriteLine($"-----> Got to {RouteData.Values["action"]} method, args are {JsonSerializer.Serialize(data)}");
    }
    private void LogMethodInfo()
    {
        LogMethodInfo<string>(null);
    }

    // Example request
    // https://localhost:7197/api/schedule
    [HttpGet]
    public ActionResult<IEnumerable<ScheduleEntryReadDto>> GetSchedule()
    {
        LogMethodInfo();
        var items = _table.GetAllEntries();
        return Ok(_mapper.Map<IEnumerable<ScheduleEntryReadDto>>(items));
    }

    [HttpGet, Route("GetScheduleBetweenDates")]
    public ActionResult<IEnumerable<ScheduleEntryReadDto>> GetScheduleBetweenDates(DateSpanDto data)
    {
        LogMethodInfo(data);
        var items = _table.GetEntriesInDates(data.BeginDate, data.EndDate);
        return Ok(_mapper.Map<IEnumerable<ScheduleEntryReadDto>>(items));
    }

    [HttpGet, Route("GetScheduleByDateIntervalAndProfessorId")]
    public ActionResult<IEnumerable<ScheduleEntryReadDto>> GetScheduleByDateIntervalAndProfessorId(DateSpanAndProfessorScheduleReadDto data)
    {
        LogMethodInfo(data);
        var professor = _table.GetProfessorById(data.ProfessorId);
        var schedule = _table.GetEntriesInDatesForProfessor(data.DateSpan.BeginDate, data.DateSpan.EndDate, professor);
        return Ok(_mapper.Map<IEnumerable<ScheduleEntryReadDto>>(schedule));
    }

    [HttpGet, Route("GetScheduleByDateIntervalAndGroupId")]
    public ActionResult GetScheduleByDateIntervalAndGroupId(DateSpanAndGroupScheduleReadDto data)
    {
        LogMethodInfo(data);
        var group = _table.GetGroupById(data.GroupId);
        var schedule = _table.GetEntriesInDatesForGroup(data.DateSpan.BeginDate, data.DateSpan.EndDate, group);
        return Ok(_mapper.Map<IEnumerable<ScheduleEntryReadDto>>(schedule));
    }

    [HttpGet, Route("GetAllProfessors")]
    public ActionResult<IEnumerable<ScheduleProfessorReadDto>> GetAllProfessors()
    {
        LogMethodInfo();
        var items = _table.GetAllProfessors();
        return Ok(_mapper.Map<IEnumerable<ScheduleProfessorReadDto>>(items));
    }

    [HttpGet, Route("GetAllGroups")]
    public ActionResult<IEnumerable<ScheduleGroupReadDto>> GetAllGroups()
    {
        LogMethodInfo();
        var items = _table.GetAllGroups();
        return Ok(_mapper.Map<IEnumerable<ScheduleGroupReadDto>>(items));
    }

    [HttpGet, Route("GetSubjectTypeAvailable")]
    public ActionResult GetSubjectTypeAvailable()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("GetParaAvailable")]
    public ActionResult GetParaAvailable()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("GetSubjectsAvailable")]
    public ActionResult GetSubjectsAvailable()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("GetProfessorsAvailable")]
    public ActionResult GetProfessorsAvailable()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("GetGroupsAvailable")]
    public ActionResult GetGroupsAvailable()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("GetDatesOccupied")]
    public ActionResult GetDatesOccupied()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("GetCabinetsOccupied")]
    public ActionResult GetCabinetsOccupied()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("GetFormFromScheduleEntryId")]
    public ActionResult GetFormFromScheduleEntryId()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("EditScheduleEntryFromForm")]
    public ActionResult EditScheduleEntryFromForm()
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("PostScheduleEntryFromForm")]
    public ActionResult PostScheduleEntryFromForm()
    {
        throw new NotImplementedException();
    }

}

