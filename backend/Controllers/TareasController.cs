using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTOs;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TareasController : ControllerBase
    {
        private readonly TareaService _service;
        private readonly ILogger<TareasController> _logger;

        public TareasController(TareaService service, ILogger<TareasController> logger)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarea>>> GetTareas()
        {
            try
            {
                var tareas = await _service.ObtenerTodasAsync();
                return Ok(tareas);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener las tareas");
                return StatusCode(500, "Error al obtener las tareas");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tarea>> GetTarea(Guid id)
        {
            try
            {
                var tarea = await _service.ObtenerPorIdAsync(id);

                if (tarea == null)
                {
                    return NotFound(new { message = $"No se encontró la tarea con ID {id}" });
                }

                return Ok(tarea);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener la tarea {Id}", id);
                return StatusCode(500, "Error al obtener la tarea");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Tarea>> CreateTarea(CrearTareaDto dto)
        {
            try
            {
                var tarea = await _service.CrearAsync(dto);
                return CreatedAtAction(nameof(GetTarea), new { id = tarea.Id }, tarea);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear la tarea");
                return StatusCode(500, "Error al crear la tarea");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Tarea>> UpdateTarea(Guid id, ActualizarTareaDto dto)
        {
            try
            {
                var tarea = await _service.ActualizarAsync(id, dto);

                if (tarea == null)
                {
                    return NotFound(new { message = $"No se encontró la tarea con ID {id}" });
                }

                return Ok(tarea);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar la tarea {Id}", id);
                return StatusCode(500, "Error al actualizar la tarea");
            }
        }

        [HttpPatch("{id}/completar")]
        public async Task<ActionResult<Tarea>> ToggleCompletada(Guid id, ActualizarEstadoTareaDto dto)
        {
            try
            {
                var tarea = await _service.ActualizarEstadoAsync(id, dto);

                if (tarea == null)
                {
                    return NotFound(new { message = $"No se encontró la tarea con ID {id}" });
                }

                return Ok(tarea);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al cambiar el estado de la tarea {Id}", id);
                return StatusCode(500, "Error al cambiar el estado de la tarea");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarea(Guid id)
        {
            try
            {
                var eliminada = await _service.EliminarAsync(id);

                if (!eliminada)
                {
                    return NotFound(new { message = $"No se encontró la tarea con ID {id}" });
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al eliminar la tarea {Id}", id);
                return StatusCode(500, "Error al eliminar la tarea");
            }
        }
    }
}