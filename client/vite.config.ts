import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import * as path from "node:path";
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port:3000
  },
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src"),
    }
  },
  plugins: [
    TanStackRouterVite(),
    react(),
  ],
})
