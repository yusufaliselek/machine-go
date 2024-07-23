using AutoMapper;
using Core.DTOs.Machine;
using Core.Entities;

namespace Service.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<CreateMachineDto, Machine>();
            CreateMap<UpdateMachineDto, Machine>();
        }
    }
}
