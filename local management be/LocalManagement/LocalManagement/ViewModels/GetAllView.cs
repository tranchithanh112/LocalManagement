using LocalManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.ViewModels
{
    public class GetAllView
    {
        public int cityId { get; set; }
        public string cityName { get; set; }
        public int districtId { get; set; }
        public string districtName { get; set; }
        public List<District> Districts { get; set; }
        public int wardId { get; set; }
        public List<Ward> Wards { get; set; }
        public string wardName { get; set; }
        public string Key { get; internal set; }
        public string Ten { get; internal set; }
        public object Children { get; internal set; }
    }
}
