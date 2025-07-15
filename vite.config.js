// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // standaard root: projectfolder
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // wijs expliciet het HTML-entrypunt toe
      input: 'public/index.html'
    }
  },
  plugins: [react()]
})
