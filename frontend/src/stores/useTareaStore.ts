import type { EstadoTarea, FiltroTarea, PayloadActualizacionEstadoTarea, PayloadActualizacionTarea, PayloadCreacionTarea, Tarea } from '@/types/tarea'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTareaStore = defineStore('tarea', () => {
  /* =============================================
     CONFIGURACIÓN
     ============================================= */

  const URL_BASE = 'http://localhost:5000/api'

  /* =============================================
     ESTADO REACTIVO
     ============================================= */

  const lista = ref<Tarea[]>([])
  const tarea = ref<Tarea | null>(null)
  const filtro = ref<FiltroTarea>('todas')
  const error = ref<string | null>(null)
  const cargando = ref(false)

  /* =============================================
     GETTERS COMPUTADOS
     ============================================= */

  const listaFiltrada = computed(() => {
    return filtro.value === 'todas'
      ? lista.value
      : lista.value.filter((tarea) => tarea.estado === filtro.value)
  })

  const tareasPendientes = computed(() => {
    return lista.value.filter((tarea) => tarea.estado === 'pendiente').length
  })

  const tareasCompletadas = computed(() => {
    return lista.value.filter((tarea) => tarea.estado === 'completada').length
  })

  const totalTareas = computed(() => {
    return lista.value.length
  })

  /* =============================================
     ACCIONES - LECTURA (GET)
     ============================================= */

  async function cargarTareas() {
    cargando.value = true
    error.value = null

    try {
      const respuesta = await fetch(`${URL_BASE}/tareas`)

      if (!respuesta.ok) {
        throw new Error(`${respuesta.status}: ${respuesta.statusText}`)
      }

      lista.value = await respuesta.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
      throw e
    } finally {
      cargando.value = false
    }
  }

  async function cargarTarea(id: number) {
    cargando.value = true
    error.value = null

    try {
      const respuesta = await fetch(`${URL_BASE}/tareas/${id}`)

      if (!respuesta.ok) {
        throw new Error(`${respuesta.status}: ${respuesta.statusText}`)
      }

      tarea.value = await respuesta.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
      throw e
    } finally {
      cargando.value = false
    }
  }

  /* =============================================
     ACCIONES - CREACIÓN (POST)
     ============================================= */

  async function crearTarea(payload: PayloadCreacionTarea): Promise<Tarea> {
    cargando.value = true
    error.value = null

    try {
      const respuesta = await fetch(`${URL_BASE}/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!respuesta.ok) {
        throw new Error(`${respuesta.status}: ${respuesta.statusText}`)
      }

      const nuevaTarea: Tarea = await respuesta.json()
      lista.value.push(nuevaTarea)

      return nuevaTarea
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
      throw e
    } finally {
      cargando.value = false
    }
  }

  /* =============================================
     ACCIONES - ACTUALIZACIÓN (PUT/PATCH)
     ============================================= */

  async function actualizarTarea(
    id: number,
    payload: PayloadActualizacionTarea
  ): Promise<Tarea> {
    cargando.value = true
    error.value = null

    try {
      const respuesta = await fetch(`${URL_BASE}/tareas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!respuesta.ok) {
        throw new Error(`${respuesta.status}: ${respuesta.statusText}`)
      }

      const tareaActualizada: Tarea = await respuesta.json()

      const index = lista.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        lista.value[index] = tareaActualizada
      }

      return tareaActualizada
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
      throw e
    } finally {
      cargando.value = false
    }
  }

  async function actualizarEstadoTarea(
    id: number,
    nuevoEstado: EstadoTarea
  ): Promise<Tarea> {
    cargando.value = true
    error.value = null

    try {
      const payload: PayloadActualizacionEstadoTarea = { estado: nuevoEstado }

      const respuesta = await fetch(`${URL_BASE}/tareas/${id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!respuesta.ok) {
        throw new Error(`${respuesta.status}: ${respuesta.statusText}`)
      }

      const tareaActualizada: Tarea = await respuesta.json()

      const index = lista.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        lista.value[index] = tareaActualizada
      }

      return tareaActualizada
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
      throw e
    } finally {
      cargando.value = false
    }
  }

  /* =============================================
     ACCIONES - ELIMINACIÓN (DELETE)
     ============================================= */

  async function eliminarTarea(id: number): Promise<void> {
    cargando.value = true
    error.value = null

    try {
      const respuesta = await fetch(`${URL_BASE}/tareas/${id}`, {
        method: 'DELETE',
      })

      if (!respuesta.ok) {
        throw new Error(`${respuesta.status}: ${respuesta.statusText}`)
      }

      const index = lista.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        lista.value.splice(index, 1)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
      throw e
    } finally {
      cargando.value = false
    }
  }

  /* =============================================
     ACCIONES - FILTROS
     ============================================= */

  function cambiarFiltro(nuevoFiltro: FiltroTarea) {
    filtro.value = nuevoFiltro
  }

  function limpiarFiltro() {
    filtro.value = 'todas'
  }

  /* =============================================
     ACCIONES - UTILIDADES
     ============================================= */

  function limpiarError() {
    error.value = null
  }

  function limpiarTarea() {
    tarea.value = null
  }

  /* =============================================
     INTERFAZ PÚBLICA DEL STORE
     ============================================= */

  return {
    // Estado
    lista,
    tarea,
    filtro,
    cargando,
    error,

    // Getters
    listaFiltrada,
    tareasPendientes,
    tareasCompletadas,
    totalTareas,

    // Acciones - Lectura
    cargarTareas,
    cargarTarea,

    // Acciones - Escritura
    crearTarea,
    actualizarTarea,
    actualizarEstadoTarea,
    eliminarTarea,

    // Acciones - Filtros
    cambiarFiltro,
    limpiarFiltro,

    // Acciones - Utilidades
    limpiarError,
    limpiarTarea,
  }
})
