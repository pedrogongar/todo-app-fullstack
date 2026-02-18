namespace backend.Models
{
    public class Tarea
    {
        public Guid Id {get; init; } = Guid.NewGuid();
        public required string Titulo {get; set;}
        public string? Descripcion {get; set;}
        public bool Completada {get; set;} = false;
        public DateOnly? FechaInicio {get; set;}
        public DateOnly? FechaFin {get; set;}
    }
}