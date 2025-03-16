import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      
      include:'**/*.svg',
    })
  ],
  resolve:{
    extensions:['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  },
  assetsInclude: ['**/*.JPG',"**/*.PNG"],

})
