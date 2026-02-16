<script setup lang="ts">
// ============================================================================
// Imports
// ============================================================================
import TareaFiltros from '@/components/TareaFiltros.vue'
import TareaFormulario from '@/components/TareaFormulario.vue'
import TareaLista from '@/components/TareaLista.vue'
import { useTareaStore } from '@/stores/useTareaStore'
import type { PayloadActualizacionTarea, Tarea } from '@/types/tarea'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

// ============================================================================
// Store
// ============================================================================
const store = useTareaStore()
const { listaFiltrada, filtro, cargando, error, totalTareas, tareasPendientes, tareasCompletadas } =
  storeToRefs(store)
const {
  cargarTareas,
  crearTarea,
  actualizarTarea,
  actualizarEstadoTarea,
  eliminarTarea,
  cambiarFiltro,
} = store

// ============================================================================
// Estado local
// ============================================================================
const tareaEditando = ref<Tarea | undefined>(undefined)

// ============================================================================
// Métodos
// ============================================================================
const manejarEditar = (id: number) => {
  tareaEditando.value = store.lista.find((t) => t.id === id) ?? undefined
}

const manejarEnvio = (payload: PayloadActualizacionTarea) => {
  if (tareaEditando.value) {
    actualizarTarea(tareaEditando.value.id, payload)
    tareaEditando.value = undefined
  } else {
    crearTarea(payload)
  }
}

const manejarAlternar = (id: number) => {
  const tarea = store.lista.find((t) => t.id === id)
  if (!tarea) return
  const nuevoEstado = tarea.estado === 'pendiente' ? 'completada' : 'pendiente'
  actualizarEstadoTarea(id, nuevoEstado)
}

// ============================================================================
// Ciclo de vida
// ============================================================================
onMounted(() => {
  cargarTareas()
})
</script>

<template>
  <!-- ========================================================================
  Formulario
  ========================================================================= -->
  <TareaFormulario :tarea-inicial="tareaEditando" @enviar="manejarEnvio" />

  <!-- ========================================================================
  Filtros
  ========================================================================= -->
  <TareaFiltros
    :filtro-activo="filtro"
    :total="totalTareas"
    :pendientes="tareasPendientes"
    :completadas="tareasCompletadas"
    @nuevo-filtro="cambiarFiltro"
  />

  <!-- ========================================================================
  Lista
  ========================================================================= -->
  <TareaLista
    :tareas="listaFiltrada"
    :cargando="cargando"
    :error="error"
    @eliminar="eliminarTarea"
    @alternar="manejarAlternar"
    @editar="manejarEditar"
  />
</template>
