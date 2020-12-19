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
using ManagementServices.Helper;
using LocalManagement.Services;

namespace LocalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WardsController : ControllerBase
    {
        private readonly APIDbcontext _context;
        IMapper _mapper;
        public WardsController(APIDbcontext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Wards
        [HttpGet("getall")]
        public async Task<ActionResult<IEnumerable<WardView>>> GetWards()
        {
            var result=  await _context.Wards.Include(x=>x.District).Select(x => new WardView()
            {
               wardId = x.wardId,
                districtId = x.districtId,
                wardName = x.wardName,
                DistrictView = _mapper.Map<DistrictView>(x.District)
            }).ToListAsync();
            return Ok(result);
        }
        [HttpGet]
        public ActionResult<PagedList<WardView>> GetQuan([FromQuery] thamsoPhanTrang tsPhantrang)
        {

            IQueryable<WardView> wards = _context.Wards.Include(x => x.District).Select(x => new WardView()
            {
                districtId = x.districtId,
                wardId = x.wardId,
                wardName = x.wardName,
                DistrictView = _mapper.Map<DistrictView>(x.District)
            });

            var phuong = PagedList<WardView>.ToPagedList(wards, tsPhantrang.currentPage, tsPhantrang.PageSize);
            var metadata = new
            {
                phuong,
                phuong.TotalCount,
                phuong.PageSize,
                phuong.CurrentPage,
                phuong.TotalPages,
                phuong.HasNext,
                phuong.HasPrevious
            };

            return Ok(metadata);
        }

        // GET: api/Wards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ward>> GetWard(int id)
        {
            var ward = await _context.Wards.FindAsync(id);

            if (ward == null)
            {
                return NotFound();
            }

            return ward;
        }

        [HttpGet("GetWard/{id}")]
        public async Task<ActionResult<List<WardView>>> GetDistrict(int id)
        {
            List<WardView> wards = _mapper.Map<List<WardView>>(await _context.Wards.Where(x => x.districtId == id).ToListAsync());
            return wards;
        }


        // PUT: api/Wards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWard(int id, WardView model)
        {
            if (id != model.wardId)
            {
                return BadRequest();
            }
            Ward ward = _mapper.Map<Ward>(model);

            _context.Entry(ward).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WardExists(id))
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

        // POST: api/Wards
        [HttpPost]
        public async Task<ActionResult<Ward>> PostWard(WardView ward)
        {
            var model = _mapper.Map<Ward>(ward);
            _context.Wards.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWard", new { id = ward.wardId }, ward);
        }

        // DELETE: api/Wards/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Ward>> DeleteWard(int id)
        {
            var ward = await _context.Wards.FindAsync(id);
            if (ward == null)
            {
                return NotFound();
            }

            _context.Wards.Remove(ward);
            await _context.SaveChangesAsync();

            return ward;
        }

        private bool WardExists(int id)
        {
            return _context.Wards.Any(e => e.wardId == id);
        }
    }
}
