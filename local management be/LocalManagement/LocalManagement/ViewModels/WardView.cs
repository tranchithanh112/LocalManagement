using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.ViewModels
{
    public class WardView
    {
        public int wardId { get; set; }
        public int districtId { get; set; }
        public string wardName { get; set; }
        public DistrictView DistrictView { get; set; }
    }
}
