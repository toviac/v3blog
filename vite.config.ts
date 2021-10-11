import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    proxy: {
      '/api': 'https://voidmian.com',
    },
  },
  plugins: [
    vue(),
    // 按需导入element-plus的组件
    ViteComponents({
      customComponentResolvers: [
        ElementPlusResolver({
          importStyle: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
}));
