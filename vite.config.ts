import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteComponents({
      customComponentResolvers: [
        ElementPlusResolver({
          importStyle: true
        })
      ]
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
})
