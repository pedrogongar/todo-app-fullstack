/* =============================================
Otros tipos
============================================= */
export type FiltroTarea = 'todas' | 'pendiente' | 'completada'
export type EstadoTarea = 'pendiente' | 'completada'

/* =============================================
Interface principal
============================================= */
export interface Tarea {
  readonly id: number
  nombre: string
  descripcion: string
  estado: EstadoTarea
  readonly fechaCreacion: Date
  readonly fechaCompletado: Date | null
}

/* =============================================
Payloads
============================================= */
export type PayloadCreacionTarea = Pick<Tarea, 'nombre' | 'descripcion'>
export type PayloadActualizacionTarea = Pick<Tarea, 'nombre' | 'descripcion'>
export type PayloadActualizacionEstadoTarea = Pick<Tarea, 'estado'>
