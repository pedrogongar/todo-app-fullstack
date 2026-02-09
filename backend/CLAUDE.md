# Backend — CLAUDE.md

Este archivo complementa el CLAUDE.md raíz con convenciones específicas del backend.

## Contexto

Proyecto de aprendizaje fullstack. Este backend sirve la API REST para la aplicación de gestión de tareas.

## Stack

- C# .NET 10
- ASP.NET Core Web API
- Entity Framework Core (si se usa ORM)
- PostgreSQL (si se usa base de datos)

## Convenciones de código

- Nulabilidad habilitada (`<Nullable>enable</Nullable>`).
- async/await con CancellationToken en todos los métodos async.
- Validaciones explícitas en DTOs.
- Nombres en español para modelos de dominio y DTOs.
- Sin valores mágicos — usar constantes o configuración.

## Contrato de API

El contrato de API está definido en el CLAUDE.md raíz. Cualquier cambio en endpoints, modelos de datos o códigos de respuesta debe acordarse entre frontend y backend antes de implementarse.

## Estructura sugerida

```
backend/
├── Controllers/
│   └── TareasController.cs
├── Models/
│   └── Tarea.cs
├── DTOs/
│   ├── CrearTareaDto.cs
│   ├── ActualizarTareaDto.cs
│   └── ActualizarEstadoTareaDto.cs
├── Services/
│   └── TareaService.cs
└── Program.cs
```

## Notas

Este archivo es una plantilla. El desarrollador del backend debe adaptarlo a sus convenciones y completarlo según avance el proyecto.
