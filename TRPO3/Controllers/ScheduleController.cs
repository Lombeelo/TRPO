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

    [HttpPost, Route("GetScheduleBetweenDates")]
    public ActionResult<IEnumerable<ScheduleEntryReadDto>> GetScheduleBetweenDates(DateSpanDto data)
    {
        LogMethodInfo(data);
        var items = _table.GetEntriesInDates(data.BeginDate, data.EndDate);
        return Ok(_mapper.Map<IEnumerable<ScheduleEntryReadDto>>(items));
    }

    [HttpPost, Route("GetScheduleByDateIntervalAndProfessorId")]
    public ActionResult<IEnumerable<ScheduleEntryReadDto>> GetScheduleByDateIntervalAndProfessorId(DateSpanAndProfessorScheduleReadDto data)
    {
        LogMethodInfo(data);
        var professor = _table.GetProfessorById(data.ProfessorId);
        var schedule = _table.GetEntriesInDatesForProfessor(data.DateSpan.BeginDate, data.DateSpan.EndDate, professor);
        return Ok(_mapper.Map<IEnumerable<ScheduleEntryReadDto>>(schedule));
    }

    [HttpPost, Route("GetScheduleByDateIntervalAndGroupId")]
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
    public ActionResult<IEnumerable<ScheduleLessonTypeReadDto>> GetAllSubjectTypes()
    {
        LogMethodInfo();
        var items = _table.GetAllLessonTypes();
        return Ok(_mapper.Map<IEnumerable<ScheduleLessonTypeReadDto>>(items));
    }

    [HttpGet, Route("GetAllSubjects")]
    public ActionResult<IEnumerable<ScheduleSubjectReadDto>> GetAllSubjects()
    {
        LogMethodInfo();
        var items = _table.GetAllSubjects();
        return Ok(_mapper.Map<IEnumerable<ScheduleSubjectReadDto>>(items));
    }

    // Create Form Methods


    [HttpPost, Route("GetSubjectTypeAvailable")]
    public ActionResult<IEnumerable<ScheduleLessonTypeReadDto>> GetSubjectTypeAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleLessonTypeReadDto>>(_table.GetAllLessonTypes()));
    }

    [HttpPost, Route("GetParaAvailable")]
    public ActionResult<IEnumerable<int>> GetParaAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetParaAvailable(data));
    }

    [HttpPost, Route("GetSubjectsAvailable")]
    public ActionResult<IEnumerable<ScheduleSubjectReadDto>> GetSubjectsAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleSubjectReadDto>>(_table.GetSubjectsAvailable(data)));
    }

    [HttpPost, Route("GetProfessorsAvailable")]
    public ActionResult<IEnumerable<ScheduleProfessorReadDto>> GetProfessorsAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleProfessorReadDto>>(_table.GetProfessorsAvailable(data)));
    }

    [HttpPost, Route("GetGroupsAvailable")]
    public ActionResult<IEnumerable<ScheduleGroupReadDto>> GetGroupsAvailable(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleGroupReadDto>>(_table.GetGroupsAvailable(data)));
    }

    [HttpPost, Route("GetDatesOccupied")]
    public ActionResult<IEnumerable<DateTime>> GetDatesOccupied(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetDatesOccupied(data));
    }

    [HttpPost, Route("GetCabinetsOccupied")]
    public ActionResult<IEnumerable<int>> GetCabinetsOccupied(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetCabinetsOccupied(data));
    }

    [HttpPost, Route("GetFormFromScheduleEntryId")]
    public ActionResult<ScheduleEntryEditForm> GetFormFromScheduleEntryId(int id)
    {
        var form = _mapper.Map<ScheduleEntryCreateForm>(_table.GetScheduleEntryById(id));
        return Ok(new ScheduleEntryEditForm
        {
            Id = id,
            Form = form
        });
    }

    [HttpPost, Route("EditScheduleEntryFromForm")]
    public ActionResult EditScheduleEntryFromForm(ScheduleEntryCreateForm data)
    {
        throw new NotImplementedException();
    }

    [HttpPost, Route("PostScheduleEntryFromForm")]
    public ActionResult<bool> PostScheduleEntryFromForm(ScheduleEntryCreateForm data)
    {
        LogMethodInfo(data);
        var created = _table.PostScheduleEntryFromForm(data);
        if (created)
        {
            return Ok(created);
        }
        return UnprocessableEntity(new { created = created, data = data });
    }

}

