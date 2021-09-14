import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://doco.vip',
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
    //按需导入element-plus的css样式
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
