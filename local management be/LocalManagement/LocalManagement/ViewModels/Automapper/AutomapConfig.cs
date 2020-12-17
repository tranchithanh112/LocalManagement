using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.ViewModels.Automapper
{
    public class AutomapConfig:Profile
    {
        public static MapperConfiguration RegisterMappings()
        {
            return new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new ModelToView());
                cfg.AddProfile(new ViewToModel());
            });
        }
    }
}
