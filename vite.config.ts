import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'


export default defineConfig({
  base: '/sk-dv/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash']
        }
      }
    }
  }
})
