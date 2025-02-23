import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  define: {
    __VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  build: {
    watch: false
  },
  css: {
    preprocessorOptions: {
        scss: {
            api: 'modern', // or 'modern'
            silenceDeprecations: ['global-builtin', 'import', 'color-functions'],
        },
    },
  },
  optimizeDeps: {
    exclude: ['node_modules']
  },
})