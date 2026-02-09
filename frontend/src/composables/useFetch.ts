import { ref } from 'vue'

export function useFetch<T>() {
  const datos = ref<T | null>(null)
  const error = ref<string | null>(null)
  const cargando = ref(false)

  const ejecutar = async (url: string, opciones?: RequestInit) => {
    cargando.value = true
    error.value = null

    try {
      const respuesta = await fetch(url, opciones)
      if (respuesta.ok) {
        datos.value = await respuesta.json()
      } else {
        throw new Error(`${respuesta.status}: ${respuesta.statusText}`)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Error desconocido'
    } finally {
      cargando.value = false
    }
  }
  return { datos, error, cargando, ejecutar }
}
