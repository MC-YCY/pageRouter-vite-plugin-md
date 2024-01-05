
这是一个查看文档的仓库，使用vite-public-md解析.md文件作为路由页面
- node 16.x
- vue3 + vite + ts
```
.
├── src
│   ├── assets
│   │   ├── markdown.css
│   │   ├── prism.css
│   ├── components
│   │   ├── RouterPage.vue
│   ├── Markdowns
│   │   ├── name.md
│   ├── router
│   │   ├── mds.ts
│   │   ├── pages.ts
│   │   ├── index.ts
│   ├── views
│   │   ├── Home
│   │   ├── Question
│   │   ├── Study
```
**Markdowns** 下的文件名和 **router/mds** 的数据中 **routerKey**一致；

**assets/markdown.css** 用于markdown解析样式；

**assets/prism.css** 用于代码高亮样式；