/* =============================================
Tipos auxiliares del dominio
============================================= */
export type FiltroTarea = 'todas' | 'pendiente' | 'completada'
export type EstadoTarea = 'pendiente' | 'completada'

/* =============================================
Entidad principal
============================================= */
export interface Tarea {
  readonly id: number
  nombre: string
  descripcion: string
  estado: EstadoTarea
  readonly fechaCreacion: string
  readonly fechaCompletado: string | null
}

/* =============================================
Payloads para operaciones con la API
============================================= */
export type PayloadCreacionTarea = Pick<Tarea, 'nombre' | 'descripcion'>
export type PayloadActualizacionTarea = Pick<Tarea, 'nombre' | 'descripcion'>
export type PayloadActualizacionEstadoTarea = Pick<Tarea, 'estado'>
