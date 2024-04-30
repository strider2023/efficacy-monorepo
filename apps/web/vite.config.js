import { defineConfig } from 'vite'
import expressPlugin from 'vite-plugin-express';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), expressPlugin()],
})
