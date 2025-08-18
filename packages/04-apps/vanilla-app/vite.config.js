import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: { port: 3000 },
  css: {
    postcss: {},
  },
  resolve: {
    alias: {
      '@project/core': resolve(__dirname, '../../01-core/src'),
      '@project/data': resolve(__dirname, '../../02-data/src'),
      '@project/components': resolve(__dirname, '../../03-components/src'),
    },
  },
});
