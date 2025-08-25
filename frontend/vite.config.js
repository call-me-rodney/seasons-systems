import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      // Proxy API requests to backend during development
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  define: {
    // Make environment variables available at build time
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || 'http://localhost:4000/api'),
  },
  envPrefix: 'VITE_',
})
