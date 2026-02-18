namespace backend.DTOs
{
    public class ActualizarTareaDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public bool Completada { get; set; }
        public DateOnly? FechaInicio { get; set; }
        public DateOnly? FechaFin { get; set; }
    }
}