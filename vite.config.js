import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@server': path.resolve(__dirname, '../server/src'),
    },
  },

  plugins: [
    // {
    //   name: 'treat-js-files-as-jsx',
    //   async transform(code, id) {
    //     if (!id.match(/src\/.*\.js$/))  return null

    //     // Use the exposed transform from vite, instead of directly
    //     // transforming with esbuild
    //     return transformWithEsbuild(code, id, {
    //       loader: 'jsx',
    //       jsx: 'automatic',
    //     })
    //   },
    // },
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