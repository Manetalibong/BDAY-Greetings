import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Match your GitHub repo name for project Pages: https://<user>.github.io/BDAY-Greetings/
export default defineConfig({
  plugins: [react()],
  base: '/BDAY-Greetings/',
})
