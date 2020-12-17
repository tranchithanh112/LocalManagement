using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.Models
{
    public class City
    {
        [Key]
        public int cityId { get; set; }

        [Column(TypeName="nvarchar(500)")]
        public string cityName { get; set; }

        
        
       // public virtual District District { get; set; }
       // public virtual Ward Ward { get; set; }
    }
}
