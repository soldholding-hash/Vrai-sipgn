import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  base: '/app/',
  build: {
    outDir: 'dist/app',
    chunkSizeWarningLimit: 2000
  }
})
