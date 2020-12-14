using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocalManagement.Models
{
    public class APIDbcontext:DbContext
    {
        public APIDbcontext(DbContextOptions<APIDbcontext>options):base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<District>()
            .HasOne(p=>p.City)
            .WithMany()
            .HasForeignKey(p => p.cityId);

            modelBuilder.Entity<Ward>()
          .HasOne(p => p.District)
          .WithMany()
          .HasForeignKey(p => p.districtId);


            // modelBuilder.Entity<City>()
            //    .HasMany(p => p.Districts)
            //    .WithOne()
            //    .HasForeignKey(p => p.cityId);

            //modelBuilder.Entity<District>()
            //    .HasMany(p => p.Wards)
            //    .WithOne()
            //    .HasForeignKey(p => p.districtId);
        }
            

            


        public DbSet<City> Cities { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Ward> Wards { get; set; }
    }
}
