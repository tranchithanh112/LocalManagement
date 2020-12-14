using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.Models
{
    public class Ward
    {
        [Key]
        public int wardId { get; set; }
        [Column(TypeName="nvarchar(500)")]
        public string wardName { get; set; }
            
        public int districtId { get; set; }
       
        public District District { get; set; }
        
    }
    
}
