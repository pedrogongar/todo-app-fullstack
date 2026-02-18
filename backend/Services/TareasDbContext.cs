using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Services
{
    public class TareasDbContext : DbContext
    {
        public TareasDbContext(DbContextOptions<TareasDbContext> options): base(options)
        {
        }
        public DbSet<Tarea> Tareas { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Tarea>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Titulo)
                      .IsRequired()
                      .HasMaxLength(200);
                entity.Property(e => e.Descripcion)
                      .HasMaxLength(1000);
                entity.Property(e => e.Completada)
                      .HasDefaultValue(false);
                entity.Property(e => e.FechaInicio)
                      .HasColumnType("date");
                entity.Property(e => e.FechaFin)
                      .HasColumnType("date");

            });
        }
    }
}