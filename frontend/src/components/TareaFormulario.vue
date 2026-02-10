<script setup lang="ts">
// ============================================================================
// Imports
// ============================================================================
import type { PayloadActualizacionTarea } from '@/types/tarea'
import { Send } from 'lucide-vue-next'
import { ref } from 'vue'

// ============================================================================
// Props
// ============================================================================
const props = defineProps<{
  tareaInicial?: PayloadActualizacionTarea
}>()

// ============================================================================
// Emits
// ============================================================================
const emit = defineEmits<{
  (e: 'enviar', payload: PayloadActualizacionTarea): void
}>()

// ============================================================================
// Estado local
// ============================================================================
const nombre = ref(props.tareaInicial?.nombre ?? '')
const descripcion = ref(props.tareaInicial?.descripcion ?? '')

// ============================================================================
// Métodos
// ============================================================================
const manejarEnvio = () => {
  if (!nombre.value.trim() || !descripcion.value.trim()) return
  emit('enviar', { nombre: nombre.value, descripcion: descripcion.value })
}
</script>

<template>
  <!-- ========================================================================
  Contenedor principal del formulario
  ========================================================================= -->
  <div>
    <!-- ======================================================================
    Formulario de tarea
    ======================================================================= -->
    <form @submit.prevent="manejarEnvio">
      <!-- Campo nombre/título -->
      <div>
        <input type="text" v-model="nombre" placeholder="Título" />
      </div>

      <!-- Campo descripción -->
      <div>
        <input
          type="text"
          v-model="descripcion"
          placeholder="Introduce una descripción de la tarea"
        />
      </div>

      <!-- Botón enviar -->
      <div>
        <button type="submit">
          <Send class="h-5 w-5" />
        </button>
      </div>
    </form>
  </div>
</template>
