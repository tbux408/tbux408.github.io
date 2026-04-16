import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react({ include: ['**/*.{js,jsx,ts,tsx}'] }),
    tailwindcss(),
  ],
  base: '/',
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'pdf-viewer': ['@react-pdf-viewer/core'],
        },
      },
    },
  },
  server: { port: 3000 },
})
