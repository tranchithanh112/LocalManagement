using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LocalManagement.Models;

namespace LocalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictsController : ControllerBase
    {
        private readonly APIDbcontext _context;

        public DistrictsController(APIDbcontext context)
        {
            _context = context;
        }
        //GET : api/districts/listid
        [HttpGet("listid")]

        public async Task<ActionResult<List<int>>> GetDistrictId()
        {
            return await _context.Districts.Select(x => x.districtId).ToListAsync();
        }

        // GET: api/Districts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<District>>> GetDistricts()
        {
            var result = await _context.Districts.Include(x=>x.City).ToListAsync();
            return Ok(result);
        }

        // GET: api/Districts/5
        [HttpGet("GetDistrict/{id}")]
        public async Task<ActionResult> GetDistrict(int id)
        {
            var district = await _context.Districts.Where(x=>x.cityId == id).ToListAsync();
            var result_d = string.Empty;
            var result_w = string.Empty;

            foreach(var item in district)
            {
                result_d += item.districtName + "<br>";
                var wards = await _context.Wards.Where(x => x.districtId == item.districtId).Select(x => x.wardName).ToListAsync();
                if(wards.Count > 0)
                {
                    for(int i=0;i<wards.Count -1; i++)
                    {
                        result_d += "<br>";
                    }
                }
                if (wards.Count == 0)
                {
                    result_w += "<br>";
                }
                foreach (var _item in wards)
                {
                    result_w += _item + "<br>";
                }

                result_d += "<hr>";
                result_w += "<hr>";
            }

            if (district == null)
            {
                return NotFound();
            }

            return Ok(new { district = result_d, ward = result_w});
        }


        // GET: api/Districts/getward/5
        [HttpGet("GetWard/{id}")]
        public async Task<ActionResult> GetWard(int id)
        {
            var district = await _context.Districts.Where(x => x.cityId == id).Select(x => x.districtId).ToListAsync();
            var result = string.Empty;


            foreach (var item in district)
            {
                var wards = await _context.Wards.Where(x => x.districtId == item).Select(x => x.wardName).ToListAsync();
                if (wards.Count == 0)
                {
                    result +="<br>";
                }
                foreach (var _item in wards) {
                    result += _item + "<br>";
                }
                
            }

            if (result == null)
            {
                return NotFound();
            }

            return Ok(new { district = result });
        }











        // PUT: api/Districts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDistrict(int id, District district)
        {
            if (id != district.districtId)
            {
                return BadRequest();
            }

            _context.Entry(district).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DistrictExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Districts
        [HttpPost]
        public async Task<ActionResult<District>> PostDistrict(District district)
        {
            _context.Districts.Add(district);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDistrict", new { id = district.districtId }, district);
        }

        // DELETE: api/Districts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<District>> DeleteDistrict(int id)
        {
            var district = await _context.Districts.FindAsync(id);
            if (district == null)
            {
                return NotFound();
            }

            _context.Districts.Remove(district);
            await _context.SaveChangesAsync();

            return district;
        }

        private bool DistrictExists(int id)
        {
            return _context.Districts.Any(e => e.districtId == id);
        }
    }
}
