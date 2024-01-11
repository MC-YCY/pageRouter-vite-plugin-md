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
//! vite-public-md 暂不支持吧 ，改为页面内处理
// import toc from 'markdown-it-toc-done-right';

// https://vitejs.dev/config/
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// 讲 字符出 通过encodeURI 转义后 字符串 处理为符合css选择器命名标准的字符串
// 采用讲 # 去掉 % 
// 后面内容滚动 采用此函数获取dom Rect信息
const processStringConformCss = (inputString:string) => {
  // 去掉开头的#
  let step1 = inputString.replace(/^#/, '');
  // 将%转换为_
  let step12 = step1.replace(/%/g, '');
  let result = step12.replace(/[^a-zA-Z0-9_]/g, '').replace(/^[^a-zA-Z]+/, '');
  return result;
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
        md.use(mita, { permalink: true, permalinkBefore: true, permalinkSymbol: '#' ,slugify:(e)=>{
          return processStringConformCss(encodeURI(e))
        }})
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
