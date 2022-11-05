using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
    public ActionResult<IEnumerable<ScheduleLessonTypeReadDto>> GetSubjectTypeAvailable(ScheduleEntryForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleLessonTypeReadDto>>(_table.GetAllLessonTypes()));
    }

    [HttpPost, Route("GetParaAvailable")]
    public ActionResult<IEnumerable<int>> GetParaAvailable(ScheduleEntryForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetParaAvailable(data));
    }

    [HttpPost, Route("GetSubjectsAvailable")]
    public ActionResult<IEnumerable<ScheduleSubjectReadDto>> GetSubjectsAvailable(ScheduleEntryForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleSubjectReadDto>>(_table.GetSubjectsAvailable(data)));
    }

    [HttpPost, Route("GetProfessorsAvailable")]
    public ActionResult<IEnumerable<ScheduleProfessorReadDto>> GetProfessorsAvailable(ScheduleEntryForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleProfessorReadDto>>(_table.GetProfessorsAvailable(data)));
    }

    [HttpPost, Route("GetGroupsAvailable")]
    public ActionResult<IEnumerable<ScheduleGroupReadDto>> GetGroupsAvailable(ScheduleEntryForm data)
    {
        LogMethodInfo(data);
        return Ok(_mapper.Map<IEnumerable<ScheduleGroupReadDto>>(_table.GetGroupsAvailable(data)));
    }

    [HttpPost, Route("GetDatesOccupied")]
    public ActionResult<IEnumerable<DateTime>> GetDatesOccupied(ScheduleEntryForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetDatesOccupied(data));
    }

    [HttpPost, Route("GetCabinetsOccupied")]
    public ActionResult<IEnumerable<int>> GetCabinetsOccupied(ScheduleEntryForm data)
    {
        LogMethodInfo(data);
        return Ok(_table.GetCabinetsOccupied(data));
    }

    [HttpPost, Route("GetFormFromScheduleEntryId")]
    public ActionResult<ScheduleEntryReadDto> GetFormFromScheduleEntryId(IdDto dto)
    {
        var form = _table.GetScheduleEntryById(dto.Id);
        return Ok(_mapper.Map<ScheduleEntryReadDto>(form));
    }

    [HttpPost, Route("GetGroupById")]
    public ActionResult<ScheduleGroupReadDto> GetGroupById(IdDto dto)
    {
        var item = _table.GetGroupById(dto.Id);
        return Ok(_mapper.Map<ScheduleGroupReadDto>(item));
    }

    [HttpPost, Route("GetProfessorById")]
    public ActionResult<ScheduleProfessorReadDto> GetProfessorById(IdDto dto)
    {
        var item = _table.GetProfessorById(dto.Id);
        return Ok(_mapper.Map<ScheduleProfessorReadDto>(item));
    }

    [HttpPost, Route("GetSubjectTypeById")]
    public ActionResult<ScheduleLessonTypeReadDto> GetSubjectTypeById(IdDto dto)
    {
        var item = _table.GetLessonTypeById(dto.Id);
        return Ok(_mapper.Map<ScheduleLessonTypeReadDto>(item));
    }
    [HttpPost, Route("GetSubjectById")]
    public ActionResult<ScheduleSubjectReadDto> GetSubjectById(IdDto dto)
    {
        var item = _table.GetSubjectById(dto.Id);
        return Ok(_mapper.Map<ScheduleSubjectReadDto>(item));
    }

    [HttpPost, Route("DeleteEntryById")]
    public ActionResult<bool> DeleteEntryById(IdDto dto)
    {
        var result = _table.DeleteEntryById(dto.Id);
        if (result)
        {
            return Ok(result);
        }
        return UnprocessableEntity(new { result, dto.Id });
    }

    [HttpPost, Route("EditScheduleEntryFromForm")]
    public ActionResult EditScheduleEntryFromForm(ScheduleEntryForm data)
    {
        var result = _table.EditScheduleEntryFromForm(data);
        if (result)
        {
            return Ok(result);
        }
        return UnprocessableEntity(new { result, data });
    }

    [HttpPost, Route("PostScheduleEntryFromForm")]
    public ActionResult<bool> PostScheduleEntryFromForm(ScheduleEntryForm data)
    {
        LogMethodInfo(data);
        var created = _table.PostScheduleEntryFromForm(data);
        if (created)
        {
            return Ok(created);
        }
        return UnprocessableEntity(new { created, data });
    }

}

