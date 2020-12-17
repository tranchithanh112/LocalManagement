using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.ViewModels
{
    public class DistrictView
    {
        public string districtName { get; set; }
        public int districtId { get; set; }
        public int cityId { get; set; }
        public CityView CityView { get; set; }
    }
}
