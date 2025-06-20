import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
//   build:{
// outDir:path.join(__dirname,'dist'),
// emptyOutDir:true
//   },
//   resolve:{
//     extensions:['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
//   },
  assetsInclude: ['**/*.JPG',"**/*.PNG",'**/*.svg'],

})
