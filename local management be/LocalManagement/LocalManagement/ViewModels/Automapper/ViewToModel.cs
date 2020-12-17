using LocalManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
namespace LocalManagement.ViewModels.Automapper
{
    public class ViewToModel:Profile
    {
        public ViewToModel()
        {
            CreateMap<CityView, City>();
            CreateMap<DistrictView, District>();
            CreateMap<WardView, Ward>();
        }
    }
}
