import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md';
import path from 'path'
const { resolve } = path;
// ant-design-vue 自动局部插件
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// 锚点 # 点击的
import mita from 'markdown-it-anchor';
// 代码高亮
import mitp from 'markdown-it-prism';
// 代码块什么的
import code from '@yankeeinlondon/code-builder';
// 目录 这个没效果 待解决
// import toc from 'markdown-it-toc-done-right';


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
      builders: [code()],
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(mita, { permalink: true, permalinkBefore: true, permalinkSymbol: '#' })
        md.use(mitp);
      },
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
