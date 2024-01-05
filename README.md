
这是一个查看文档的仓库，使用vite-public-md解析.md文件作为路由页面
- node 16.x
- vue3 + vite + ts
```
.
├── src
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
Markdowns 下的文件和 router/mds 的数据 routerKey一致；