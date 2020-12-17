using AutoMapper;
using LocalManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.ViewModels.Automapper
{
    public class ModelToView:Profile
    {
        public ModelToView()
        {
            CreateMap<City, CityView>();
            CreateMap<District, DistrictView>();
            CreateMap<Ward, WardView>();
        }
    }
}
