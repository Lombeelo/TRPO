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

    [HttpGet, Route("GetAllSubjectTypes")]
    public ActionResult<IEnumerable<ScheduleSubjectReadDto>> GetAllSubjectTypes()
    {
        LogMethodInfo();
        var items = _table.GetAllLessonTypes();
        return Ok(_mapper.Map<IEnumerable<ScheduleSubjectReadDto>>(items));
    }

    // Create Form Methods


    [HttpGet, Route("GetSubjectTypeAvailable")]
    public ActionResult<IEnumerable<ScheduleLessonTypeReadDto>> GetSubjectTypeAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleLessonTypeReadDto>>(_table.GetAllLessonTypes()));
    }

    [HttpGet, Route("GetParaAvailable")]
    public ActionResult<IEnumerable<int>> GetParaAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetParaAvailable(data));
    }

    [HttpGet, Route("GetSubjectsAvailable")]
    public ActionResult<IEnumerable<ScheduleSubjectReadDto>> GetSubjectsAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleSubjectReadDto>>(_table.GetSubjectsAvailable(data)));
    }

    [HttpGet, Route("GetProfessorsAvailable")]
    public ActionResult<IEnumerable<ScheduleProfessorReadDto>> GetProfessorsAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleProfessorReadDto>>(_table.GetProfessorsAvailable(data)));
    }

    [HttpGet, Route("GetGroupsAvailable")]
    public ActionResult<IEnumerable<ScheduleGroupReadDto>> GetGroupsAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleGroupReadDto>>(_table.GetGroupsAvailable(data)));
    }

    [HttpGet, Route("GetDatesOccupied")]
    public ActionResult<IEnumerable<DateTime>> GetDatesOccupied(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetDatesOccupied(data));
    }

    [HttpGet, Route("GetCabinetsOccupied")]
    public ActionResult<IEnumerable<int>> GetCabinetsOccupied(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetCabinetsOccupied(data));
    }

    [HttpGet, Route("GetFormFromScheduleEntryId")]
    public ActionResult GetFormFromScheduleEntryId(ScheduleEntryCreateForm data)
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("EditScheduleEntryFromForm")]
    public ActionResult EditScheduleEntryFromForm(ScheduleEntryCreateForm data)
    {
        throw new NotImplementedException();
    }

    [HttpGet, Route("PostScheduleEntryFromForm")]
    public ActionResult<bool> PostScheduleEntryFromForm(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        var created = _table.PostScheduleEntryFromForm(data);
        if (created)
        {
            return Ok(created);
        }
        return BadRequest(data);
    }

}

