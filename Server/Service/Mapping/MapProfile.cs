using AutoMapper;
using Core.DTOs.Machine;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
