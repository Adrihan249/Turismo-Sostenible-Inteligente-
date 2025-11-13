import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ⬇️ SECCIÓN A AGREGAR ⬇️
  preview: {
    // Esto permite que Vite acepte solicitudes desde el dominio de Render.
    allowedHosts: [
      'turismo-sostenible-inteligente.onrender.com'
    ]
  }
});
