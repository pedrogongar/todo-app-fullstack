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
  Contenedor principal
  ========================================================================= -->
  <div class="shadow rounded-lg min-h-40 w-60 m-10 bg-violet-200">
    <!-- ======================================================================
    Contenido
    ======================================================================= -->
    <div class="m-2 p-2 grid">
      <button type="button" @click="$emit('alternar', tarea.id)">
        <Check class="w-5 h-5" />
      </button>

      <div class="flex">
        <span>
          Título: <span>{{ tarea.nombre }}</span>
        </span>
      </div>

      <div class="flex">
        <span>
          Descripción: <span>{{ tarea.descripcion }}</span>
        </span>
      </div>

      <div class="flex">
        <span>
          Estado: <span>{{ tarea.estado }}</span>
        </span>
      </div>

      <div class="flex">
        <span>
          Creado: <span>{{ tarea.fechaInicio }}</span>
        </span>
      </div>

      <div v-if="tarea.fechaFin" class="flex">
        <span>
          Completado: <span>{{ tarea.fechaFin }}</span>
        </span>
      </div>
    </div>

    <!-- ======================================================================
    Acciones
    ======================================================================= -->
    <div>
      <button type="button" @click="$emit('editar', tarea.id)">
        <Pencil class="w-5 h-5" />
      </button>

      <button type="button" @click="$emit('eliminar', tarea.id)">
        <Trash2 class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
