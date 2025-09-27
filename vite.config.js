import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expone en todas las interfaces de red
    port: 5173, // Puerto por defecto de Vite
    // host: '0.0.0.0', // Alternativa explícita
  }
})
