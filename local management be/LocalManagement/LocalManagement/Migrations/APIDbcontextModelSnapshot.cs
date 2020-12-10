﻿// <auto-generated />
using LocalManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace LocalManagement.Migrations
{
    [DbContext(typeof(APIDbcontext))]
    partial class APIDbcontextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("LocalManagement.Models.City", b =>
                {
                    b.Property<int>("cityId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("cityName")
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("cityId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("LocalManagement.Models.District", b =>
                {
                    b.Property<int>("districtId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("cityId");

                    b.Property<string>("districtName")
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("districtId");

                    b.HasIndex("cityId");

                    b.ToTable("Districts");
                });

            modelBuilder.Entity("LocalManagement.Models.Ward", b =>
                {
                    b.Property<int>("wardId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("districtId");

                    b.Property<string>("wardName")
                        .HasColumnType("nvarchar(500)");

                    b.HasKey("wardId");

                    b.HasIndex("districtId");

                    b.ToTable("Wards");
                });

            modelBuilder.Entity("LocalManagement.Models.District", b =>
                {
                    b.HasOne("LocalManagement.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("cityId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LocalManagement.Models.Ward", b =>
                {
                    b.HasOne("LocalManagement.Models.District", "District")
                        .WithMany()
                        .HasForeignKey("districtId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
