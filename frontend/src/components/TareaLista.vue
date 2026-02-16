<script setup lang="ts">
import type { Tarea } from '@/types/tarea'
import TareaItem from './TareaItem.vue'
import IndicadorCarga from './IndicadorCarga.vue'

defineProps<{
  tareas: Tarea[]
  cargando: boolean
  error: string | null
}>()

defineEmits<{
  editar: [id: number]
  alternar: [id: number]
  eliminar: [id: number]
}>()
</script>

<template>
  <div v-if="cargando">
    <IndicadorCarga />
  </div>

  <div v-else-if="error">
    <p>Se ha producido un error: {{ error }}</p>
  </div>

  <div v-else-if="tareas.length === 0">
    <p>No hay tareas</p>
  </div>

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
