<script setup lang="ts">
import type { FiltroTarea } from '@/types/tarea'
import { CheckCheck, ClipboardList, ListTodo } from 'lucide-vue-next'

defineProps<{
  filtroActivo: FiltroTarea
  total: number
  pendientes: number
  completadas: number
}>()

defineEmits<{
  nuevoFiltro: [payload: FiltroTarea]
}>()
</script>

<template>
  <button
    :class="filtroActivo === 'todas' ? 'bg-indigo-500 text-white' : 'bg-gray-200'"
    @click="$emit('nuevoFiltro', 'todas')"
  >
    <ClipboardList /> Todas {{ total }}
  </button>
  <button
    :class="filtroActivo === 'pendiente' ? 'bg-indigo-500 text-white' : 'bg-gray-200'"
    @click="$emit('nuevoFiltro', 'pendiente')"
  >
    <CheckCheck /> Pendientes {{ pendientes }}
  </button>
  <button
    :class="filtroActivo === 'completada' ? 'bg-indigo-500 text-white' : 'bg-gray-200'"
    @click="$emit('nuevoFiltro', 'completada')"
  >
    <ListTodo /> Completadas {{ completadas }}
  </button>
</template>
