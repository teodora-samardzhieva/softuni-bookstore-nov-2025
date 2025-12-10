import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    globals: false, // injects it, expect, should... etc. in global scope if true
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.js'],
  },
})
