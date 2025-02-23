import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@server': path.resolve(__dirname, '../server/src'),
    },
  },

  css: {
    preprocessorOptions: {
        scss: {
            api: 'modern', // or 'modern'
            silenceDeprecations: ['global-builtin', 'import', 'color-functions'],
        },
    },
  },

  plugins: [
    react(),
    svgr({
      include: '**/*.svg'
    }),
  ],

  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})