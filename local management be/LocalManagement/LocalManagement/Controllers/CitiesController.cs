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
using AuthorizeNet.Api.Contracts.V1;
using  LocalManagement.Services;

namespace LocalManagement.Controllers
{
    public class PagingParams
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]

    public class CitiesController : ControllerBase
    {
        IMapper _mapper;
        private readonly APIDbcontext _context;

        public CitiesController(APIDbcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet("getall")]
        public async Task<ActionResult<List<CityView>>> GetCities()
        {
            return _mapper.Map<List<CityView>>(await _context.Cities.ToListAsync());
        }
        


        [HttpGet]
        public ActionResult<PagedList<CityView>> GetthanhPhos([FromQuery] thamsoPhanTrang tsPhantrang)
        {

            IQueryable<CityView> cities = _context.Cities.Select(x => new CityView()
            {
                cityId = x.cityId,
                cityName=x.cityName
            });
            //List<ThanhPhoView> thanhPhoViews = _mapper.Map<List<ThanhPhoView>>(thanhPhos);

            var thanhphos = PagedList<CityView>.ToPagedList(cities, tsPhantrang.currentPage, tsPhantrang.PageSize);
            var metadata = new
            {
                thanhphos,
                thanhphos.TotalCount,
                thanhphos.PageSize,
                thanhphos.CurrentPage,
                thanhphos.TotalPages,
                thanhphos.HasNext,
                thanhphos.HasPrevious
            };

            return Ok(metadata);
        }
            // GET: api/Cities/5
            [HttpGet("{id}")]
        public async Task<ActionResult<CityView>> GetCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);

            if (city == null)
            {
                return NotFound();
            }

            return _mapper.Map<CityView>(city);
        }

        // PUT: api/Cities/5
        [HttpPut("PutCity/{id}")]
        public async Task<IActionResult> PutCity(int id ,CityView model)
        {
            if (id != model.cityId)
            {
                return BadRequest();
            }
            City city = _mapper.Map<City>(model);

            _context.Entry(city).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityExists(id))
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

        // POST: api/Cities
        [HttpPost]
        public async Task<ActionResult<City>> PostCity(CityView city)
        {
            var entity = _mapper.Map<City>(city);
            _context.Cities.Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCity", new { id = city.cityId }, city);
        }

        // DELETE: api/Cities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<City>> DeleteCity(int id)
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null)
            {
                return NotFound();
            }
            
            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return city;
        }

        private bool CityExists(int id)
        {
            return _context.Cities.Any(e => e.cityId == id);
        }
    }
}
