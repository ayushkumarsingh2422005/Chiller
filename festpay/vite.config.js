import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG', '**/*.docx'],
  build: {
    assetsInlineLimit: 0, // Disable inlining of assets
  },
  server: {
    port: 3000, // Optional: Set the port for the development server
    open: true, // Optional: Open the browser automatically
    // Ensure the server falls back to index.html for SPA routes
    hmr: true, 
    historyApiFallback: true,
  },
})
