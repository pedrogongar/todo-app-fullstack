using backend.Models;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class TareaService
    {
        private readonly TareasDbContext _context;

        public TareaService(TareasDbContext context)
        {
            _context = context;
        }

        public async Task<List<Tarea>> ObtenerTodasAsync()
        {
            return await _context.Tareas
                .OrderByDescending(t => t.FechaInicio ?? DateOnly.MinValue)
                .ToListAsync();
        }

        public async Task<Tarea?> ObtenerPorIdAsync(Guid id)
        {
            return await _context.Tareas.FindAsync(id);
        }

        public async Task<Tarea> CrearAsync(CrearTareaDto dto)
        {
            var tarea = new Tarea
            {
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                FechaInicio = dto.FechaInicio,
                FechaFin = dto.FechaFin
            };

            _context.Tareas.Add(tarea);
            await _context.SaveChangesAsync();
            return tarea;
        }

        // Actualizar una tarea
        public async Task<Tarea?> ActualizarAsync(Guid id, ActualizarTareaDto dto)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null) return null;

            if (dto.Titulo != null)
                tarea.Titulo = dto.Titulo;

            if (dto.Descripcion != null)
                tarea.Descripcion = dto.Descripcion;
                
                tarea.Completada = dto.Completada;

            if (dto.FechaInicio.HasValue)
                tarea.FechaInicio = dto.FechaInicio;

            if (dto.FechaFin.HasValue)
                tarea.FechaFin = dto.FechaFin;

            await _context.SaveChangesAsync();
            return tarea;
        }

        public async Task<Tarea?> ActualizarEstadoAsync(Guid id, ActualizarEstadoTareaDto dto)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null) return null;

            tarea.Completada = dto.Completada;
            await _context.SaveChangesAsync();
            return tarea;
        }

        public async Task<bool> EliminarAsync(Guid id)
        {
            var tarea = await _context.Tareas.FindAsync(id);
            if (tarea == null) return false;

            _context.Tareas.Remove(tarea);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}