using AutoMapper;
using TRPO3.Dtos;
using TRPO3.Models;

namespace TRPO3.Profiles
{
    public class ScheduleProfile : Profile
    {
        public ScheduleProfile()
        {
            // Source -> Target
            CreateMap<Group, ScheduleGroupReadDto>();
            CreateMap<LessonType, ScheduleLessonTypeReadDto>();
            CreateMap<Professor, ScheduleProfessorReadDto>();
            CreateMap<Subject, ScheduleSubjectReadDto>();
            CreateMap<ScheduleEntry, ScheduleEntryReadDto>()
                .ForMember(dest => dest.Groups, opt => opt.MapFrom(src => src.Groups))
                .ForMember(dest => dest.Professors, opt => opt.MapFrom(src => src.Professors))
                .ForMember(dest => dest.Subject, opt => opt.MapFrom(src => src.Subject))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.Date));
            CreateMap<ScheduleEntry, ScheduleEntryCreateForm>()
                .ForMember(dest => dest.GroupIds,
                    opt => opt.MapFrom(src => src.Groups.Select(g => g.Id)))
                .ForMember(dest => dest.ProfessorIds,
                    opt => opt.MapFrom(src => src.Professors.Select(g => g.Id)))
                .ForMember(dest => dest.SubjectId,
                    opt => opt.MapFrom(src => src.Subject.Id))
                .ForMember(dest => dest.SubjectTypeId,
                    opt => opt.MapFrom(src => src.Type.Id))
                .ForMember(dest => dest.Date,
                    opt => opt.MapFrom(src => src.Date.Date));
        }
    }
}