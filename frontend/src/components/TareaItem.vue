<script setup lang="ts">
// ============================================================================
// Imports
// ============================================================================
import type { Tarea } from '@/types/tarea'
import { Check, Pencil, Trash2 } from 'lucide-vue-next'

// ============================================================================
// Props
// ============================================================================
defineProps<{
  tarea: Tarea
}>()

// ============================================================================
// Emits
// ============================================================================
defineEmits<{
  (e: 'editar', id: number): void
  (e: 'alternar', id: number): void
  (e: 'eliminar', id: number): void
}>()
</script>

<template>
  <!-- ========================================================================
  Contenedor principal de la tarjeta
  ========================================================================= -->
  <div class="shadow rounded-lg min-h-40 w-60 m-10 bg-violet-200">
    <!-- ======================================================================
    Contenido de la tarjeta
    ======================================================================= -->
    <div class="m-2 p-2 grid">
      <!-- Botón alternar estado -->
      <button type="button" @click="$emit('alternar', tarea.id)">
        <Check class="w-5 h-5" />
      </button>

      <!-- Título -->
      <div class="flex">
        <span>
          Título: <span>{{ tarea.nombre }}</span>
        </span>
      </div>

      <!-- Descripción -->
      <div class="flex">
        <span>
          Descripción: <span>{{ tarea.descripcion }}</span>
        </span>
      </div>

      <!-- Estado -->
      <div class="flex">
        <span>
          Estado: <span>{{ tarea.estado }}</span>
        </span>
      </div>

      <!-- Fecha de creación -->
      <div class="flex">
        <span>
          Creado: <span>{{ tarea.fechaInicio }}</span>
        </span>
      </div>

      <!-- Fecha de completado (condicional) -->
      <div v-if="tarea.fechaFin" class="flex">
        <span>
          Completado: <span>{{ tarea.fechaFin }}</span>
        </span>
      </div>
    </div>

    <!-- ======================================================================
    Acciones de la tarjeta
    ======================================================================= -->
    <div>
      <!-- Botón editar -->
      <button type="button" @click="$emit('editar', tarea.id)">
        <Pencil class="w-5 h-5" />
      </button>

      <!-- Botón eliminar -->
      <button type="button" @click="$emit('eliminar', tarea.id)">
        <Trash2 class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
