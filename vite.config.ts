import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md';
import code from '@yankeeinlondon/code-builder'
import path from 'path'
const { resolve } = path;
// ant-design-vue 自动局部插件
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';


// https://vitejs.dev/config/
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      builders: [code()]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
