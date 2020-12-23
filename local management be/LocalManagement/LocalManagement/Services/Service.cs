using AutoMapper;
using LocalManagement.Models;
using LocalManagement.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.Services
{
    public class Service
    {
        APIDbcontext DbContext;
        IMapper mapper;
        public Service(APIDbcontext _DbContext, IMapper _mapper)
        {
            DbContext = _DbContext;
            mapper = _mapper;
        }

        public List<GetAllView> GetAll()
        {
            var GetAllTable = from tp in DbContext.Cities
                              select new GetAllView
                              {
                                  Key = tp.cityId.ToString(),
                                  Ten = tp.cityName,

                                  Children = (from qh in DbContext.Districts
                                              where qh.cityId == tp.cityId

                                              select new GetAllView
                                              {
                                                  Key = qh.districtId.ToString(),
                                                  Ten = qh.districtName,
                                                  Children = (from xp in DbContext.Wards
                                                              where xp.districtId == qh.districtId
                                                              select new GetAllView
                                                              {
                                                                  Ten = xp.wardName,
                                                                  Key = xp.wardId.ToString()
                                                              }).ToList(),
                                              }).ToList(),
                              };
            return GetAllTable.ToList();
        }
    }
}

