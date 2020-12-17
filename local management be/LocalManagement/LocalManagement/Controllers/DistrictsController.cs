using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LocalManagement.Models;
using AutoMapper;
using LocalManagement.ViewModels;

namespace LocalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictsController : ControllerBase
    {
        private readonly APIDbcontext _context;
        IMapper _mapper;
       

        public DistrictsController(APIDbcontext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        // GET: api/Districts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DistrictView>>> GetDistricts()
        {
            var result = await _context.Districts.Include(x => x.City)
                                            .Select(x => new DistrictView() { 
                                                districtId = x.districtId,
                                                cityId = x.cityId,
                                                districtName = x.districtName,
                                                CityView = _mapper.Map<CityView>(x.City)
                                             })
                                            .ToListAsync();
            return Ok(result);
            
        }

       

        // GET: api/Districts/getDistrict/5
        [HttpGet("GetDistrict/{id}")]
        public async Task<ActionResult<List<DistrictView>>> GetDistrict(int id) 
        {
            List<DistrictView> districts = _mapper.Map<List<DistrictView>>( await _context.Districts.Where(x => x.cityId == id).ToListAsync());
            return districts;
        }
        // PUT: api/Districts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDistrict(int id, DistrictView model)
        {
            var district = _context.Districts.Where(x => x.cityId == model.cityId).FirstOrDefault();
            if (id != model.districtId)
            {
                return BadRequest();
            }
           

            try
            {
                district.districtName = model.districtName;
                _context.Entry(district).State = EntityState.Modified;
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
        public async Task<ActionResult<District>> PostDistrict(DistrictView district)
        {
            var model = _mapper.Map<District>(district);
            _context.Districts.Add(model);
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
