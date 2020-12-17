using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.Models
{
    public class District
    {
        [Key]
        public int districtId { get; set; }
        [Column(TypeName="nvarchar(500)")]
        public string districtName { get; set; }

        public int cityId { get; set; }

        public  City City { get; set; }
       
    }
}
