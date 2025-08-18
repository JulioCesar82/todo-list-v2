import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: { port: 3001 },
  define: {
    'process.env': {},
  },
  css: {
    postcss: {},
  },
  resolve: {
    alias: {
      '@project/core': resolve(__dirname, '../../01-core/src'),
      '@project/data': resolve(__dirname, '../../02-data/src'),
      '@project/components': resolve(__dirname, '../../03-components/src'),
      stream: 'stream-browserify',
    },
  },
})
