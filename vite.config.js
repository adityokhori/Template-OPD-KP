import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) =>{
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VUE_APP_API_URL': JSON.stringify(env.VUE_APP_API_URL),
      'process.env.VUE_APP_OPD_ID': JSON.stringify(env.VUE_APP_OPD_ID),
    },
    plugins: [react()],
  }

})
