<script setup lang="ts">
// ============================================================================
// Imports
// ============================================================================
import type { Tarea } from '@/types/tarea'
import TareaItem from './TareaItem.vue'
import IndicadorCarga from './IndicadorCarga.vue'

// ============================================================================
// Props
// ============================================================================
defineProps<{
  tareas: Tarea[]
  cargando: boolean
  error: string | null
}>()

// ============================================================================
// Emits
// ============================================================================
defineEmits<{
  editar: [id: number]
  alternar: [id: number]
  eliminar: [id: number]
}>()
</script>

<template>
  <!-- ========================================================================
  Estados de la lista
  ========================================================================= -->
  <div v-if="cargando">
    <IndicadorCarga />
  </div>

  <div v-else-if="error">
    <p>Se ha producido un error: {{ error }}</p>
  </div>

  <div v-else-if="tareas.length === 0">
    <p>No hay tareas</p>
  </div>

  <!-- ========================================================================
  Lista de tareas
  ========================================================================= -->
  <div v-else>
    <div v-for="tarea in tareas" :key="tarea.id">
      <TareaItem
        :tarea="tarea"
        @editar="$emit('editar', $event)"
        @alternar="$emit('alternar', $event)"
        @eliminar="$emit('eliminar', $event)"
      />
    </div>
  </div>
</template>
