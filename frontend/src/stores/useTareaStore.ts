import type { EstadoTarea, FiltroTarea, PayloadActualizacionEstadoTarea, PayloadActualizacionTarea, PayloadCreacionTarea, Tarea } from '@/types/tarea'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * Store principal para la gestión de tareas
 *
 * Responsabilidades:
 * - Mantener el estado de la lista de tareas
 * - Proveer operaciones CRUD contra la API REST
 * - Gestionar filtros y estados de carga/error
 * - Exponer getters computados para estadísticas
 */
export const useTareaStore = defineStore('tarea', () => {
  /* =============================================
     CONFIGURACIÓN
     ============================================= */

  /** URL base de la API backend */
  const URL_BASE = 'http://localhost:5000/api'

  /* =============================================
     ESTADO REACTIVO
     ============================================= */

  /** Lista completa de tareas cargadas desde el servidor */
  const lista = ref<Tarea[]>([])

  /** Tarea individual cargada (para vista de detalle) */
  const tarea = ref<Tarea | null>(null)

  /** Filtro activo para mostrar tareas según su estado */
  const filtro = ref<FiltroTarea>('todas')

  /** Mensaje de error de la última operación fallida */
  const error = ref<string | null>(null)

  /** Indica si hay una operación HTTP en curso */
  const cargando = ref(false)

  /* =============================================
     GETTERS COMPUTADOS
     ============================================= */

  /**
   * Lista de tareas filtrada según el filtro activo
   * - Si filtro = 'todas': retorna lista completa
   * - Si filtro = 'pendiente' | 'completada': filtra por estado
   */
  const listaFiltrada = computed(() => {
    return filtro.value === 'todas'
      ? lista.value
      : lista.value.filter((tarea) => tarea.estado === filtro.value)
  })

  /** Cantidad de tareas con estado 'pendiente' */
  const tareasPendientes = computed(() => {
    return lista.value.filter((tarea) => tarea.estado === 'pendiente').length
  })

  /** Cantidad de tareas con estado 'completada' */
  const tareasCompletadas = computed(() => {
    return lista.value.filter((tarea) => tarea.estado === 'completada').length
  })

  /** Cantidad total de tareas (sin filtrar) */
  const totalTareas = computed(() => {
    return lista.value.length
  })

  /* =============================================
     ACCIONES - LECTURA (GET)
     ============================================= */

  /**
   * Carga todas las tareas desde el servidor
   * @throws Error si la petición HTTP falla
   */
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

  /**
   * Carga una tarea específica por su ID
   * @param id - Identificador único de la tarea
   * @throws Error si la petición HTTP falla o la tarea no existe
   */
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

  /**
   * Crea una nueva tarea en el servidor
   * @param payload - Datos de la tarea a crear (nombre, descripción)
   * @returns La tarea creada con su ID asignado
   * @throws Error si la petición HTTP falla o la validación falla
   */
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

      // Actualizar la lista local con la nueva tarea
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

  /**
   * Actualiza los datos de una tarea existente
   * @param id - Identificador de la tarea a actualizar
   * @param payload - Nuevos datos (nombre, descripción)
   * @returns La tarea actualizada
   * @throws Error si la petición HTTP falla o la tarea no existe
   */
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

      // Actualizar la tarea en la lista local
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

  /**
   * Actualiza únicamente el estado de una tarea (pendiente/completada)
   * @param id - Identificador de la tarea
   * @param nuevoEstado - Nuevo estado ('pendiente' | 'completada')
   * @returns La tarea con su estado actualizado
   * @throws Error si la petición HTTP falla o la tarea no existe
   */
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

      // Actualizar la tarea en la lista local
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

  /**
   * Elimina una tarea del servidor
   * @param id - Identificador de la tarea a eliminar
   * @throws Error si la petición HTTP falla o la tarea no existe
   */
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

      // Eliminar la tarea de la lista local
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

  /**
   * Cambia el filtro activo para la lista de tareas
   * @param nuevoFiltro - Filtro a aplicar ('todas' | 'pendiente' | 'completada')
   */
  function cambiarFiltro(nuevoFiltro: FiltroTarea) {
    filtro.value = nuevoFiltro
  }

  /**
   * Resetea el filtro a 'todas'
   */
  function limpiarFiltro() {
    filtro.value = 'todas'
  }

  /* =============================================
     ACCIONES - UTILIDADES
     ============================================= */

  /**
   * Limpia el mensaje de error actual
   */
  function limpiarError() {
    error.value = null
  }

  /**
   * Limpia la tarea individual cargada
   */
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
