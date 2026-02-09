# Frontend — CLAUDE.md

Este archivo complementa el CLAUDE.md raíz con convenciones específicas del frontend.

## Contexto

Este es un proyecto de aprendizaje de fundamentos de Vue 3. El objetivo es que el desarrollador entienda cada concepto, no que el código se genere automáticamente.

## Rol de Claude Code en este proyecto

- No generar código salvo que se pida explícitamente.
- Ante dudas, guiar con preguntas y referencias a documentación oficial.
- Si se pide revisión, dar feedback tipo PR: qué cambiar, por qué, y enlace a docs.
- Priorizar que el desarrollador entienda sobre que el código funcione rápido.

## Stack

- Vue 3.5+ con Composition API y `<script setup lang="ts">`
- TypeScript estricto (sin `any`, `readonly` donde aplique)
- TailwindCSS para estilos
- Pinia (setup syntax) para estado global
- Vue Router para navegación
- Vite como bundler

## Convenciones de código

### Componentes

- Nombres en PascalCase y en español: `TareaItem.vue`, `TareaFormulario.vue`.
- Siempre `<script setup lang="ts">` — nunca Options API.
- Props tipados con `defineProps<T>()`.
- Emits tipados con `defineEmits<T>()`.
- Un componente = una responsabilidad.

### Tipos e interfaces

- Archivo dedicado: `src/types/tarea.ts`.
- Nombres en español que reflejen el dominio: `Tarea`, `PayloadCreacionTarea`.
- Nunca `any`. Usar `| null` para valores nullable, no `?` (propiedad opcional) salvo que la propiedad pueda no existir.
- `readonly` en campos que no deben mutar (ej: `id`).

### Composables

- Prefijo `use`: `useFetch.ts`, `useDebounce.ts`.
- Retornan valores reactivos (`ref`, `computed`).
- Un composable por archivo en `src/composables/`.

### Stores (Pinia)

- Setup syntax con `defineStore`.
- Prefijo `use`: `useTareaStore.ts`.
- State con `ref`, getters con `computed`, actions como funciones.
- El store es la fuente de verdad para los datos.

### Vue Router

- Lazy loading de rutas: `() => import(...)`.
- Guards de navegación cuando sea necesario.
- Archivo único: `src/router/index.ts`.

### Estilos (TailwindCSS)

- Solo utilidades de Tailwind, no CSS custom salvo excepciones justificadas.
- Layout responsive con `flex`, `grid`, breakpoints (`sm:`, `md:`, `lg:`).
- Clases condicionales dinámicas con bindings de Vue (`:class`).

## Estructura de archivos

```
src/
├── App.vue
├── main.ts
├── router/
│   └── index.ts
├── stores/
│   └── useTareaStore.ts
├── composables/
│   └── useFetch.ts
├── components/
│   ├── IndicadorCarga.vue
│   ├── TareaItem.vue
│   ├── TareaFormulario.vue
│   ├── TareaFiltros.vue
│   └── TareaLista.vue
├── types/
│   └── tarea.ts
└── views/
    └── InicioVista.vue
```

## Patrones a seguir

- Datos fluyen hacia abajo (props), eventos hacia arriba (emits).
- Lógica de negocio en stores y composables, no en componentes.
- Cada operación HTTP tiene estados: loading, error, data.
- `v-for` siempre con `:key` usando identificador único, nunca index.
- Cleanup de side-effects en `onUnmounted`.

## Documentación de referencia

- Vue 3: https://vuejs.org/guide/introduction.html
- Pinia: https://pinia.vuejs.org/
- Vue Router: https://router.vuejs.org/
- TailwindCSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs/
