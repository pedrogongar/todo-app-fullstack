# CLAUDE.md

Este archivo proporciona contexto a Claude Code para trabajar con este repositorio.

## Descripción del proyecto

Aplicación fullstack de gestión de tareas. Monorepo con dos directorios principales:

- **frontend/** — Vue 3 + TypeScript + TailwindCSS (Vite como bundler)
- **backend/** — C# .NET 10 (ASP.NET Core Web API)

## Convenciones generales

- Idioma: español para nombres de variables, interfaces, componentes, commits y documentación.
- Nombres descriptivos que reflejen el dominio, no el rol técnico.
- Sin comentarios salvo estructurales. El código debe ser autoexplicativo.
- No generar código salvo que se pida explícitamente.
- Siempre referenciar documentación oficial.

## Frontend — Vue 3 + TypeScript + TailwindCSS

- Composition API con `<script setup lang="ts">`.
- Props tipados con `defineProps<T>()`, emits tipados con `defineEmits<T>()`.
- Tipado estricto: nunca `any`, usar `readonly` donde aplique.
- Composables (`useX()`) para lógica reutilizable.
- Pinia con setup syntax para stores.
- Vue Router con lazy loading de rutas.
- TailwindCSS para estilos, layout responsive.

## Backend — C# .NET 10

- Nulabilidad habilitada.
- async/await con CancellationToken.
- Validaciones explícitas en DTOs.

## Contrato de API

| Método | Ruta             | Body                 | Respuesta            | Éxito | Errores  |
|--------|------------------|----------------------|----------------------|-------|----------|
| POST   | `/tareas`        | nombre, descripcion  | tarea creada         | 201   | 400      |
| GET    | `/tareas`        | —                    | lista de tareas      | 200   | —        |
| GET    | `/tareas/{id}`   | —                    | una tarea            | 200   | 404      |
| PUT    | `/tareas/{id}`   | nombre, descripcion  | tarea actualizada    | 200   | 400, 404 |
| PATCH  | `/tareas/{id}`   | estado               | tarea actualizada    | 200   | 400, 404 |
| DELETE | `/tareas/{id}`   | —                    | —                    | 204   | 404      |

## Estructura del frontend

```
frontend/src/
├── App.vue
├── main.ts
├── router/
│   └── index.ts
├── stores/
│   └── useTareaStore.ts
├── composables/
│   └── useFetch.ts
├── components/
│   ├── TareaLista.vue
│   ├── TareaItem.vue
│   ├── TareaFormulario.vue
│   ├── TareaFiltros.vue
│   └── IndicadorCarga.vue
├── types/
│   └── tarea.ts
└── views/
    └── InicioVista.vue
```

## Git workflow

- Gitflow: `main` (producción), `develop` (desarrollo).
- Prefijos: `feature/`, `release/`, `hotfix/`.
- Commits en español.

## Estado actual

Proyecto recién inicializado. Frontend y backend pendientes de scaffold.
