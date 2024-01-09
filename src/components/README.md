由于vite-public-md 文档中没有标注支持markdown-it-toc-done-right（md目录）；
尝试过也是行不通，所以只能通过一下方式实现目录；

1. 这里的思路是，左侧菜单切换跳转页面
    - 页面是md文件的路由页面，也可以采取读取.md文件的方式，但是需要把md文件转换为html文件，在读取h1标签做目录
    - 这里采用vite-public-md 的跳转页面后 解析后的html dom树 过滤出h标签做目录
    - 点击事件直接拿不到dom，所以放在路由守卫中！！！
2. 目录，就是根据vite-public-md 解析后的html 所有的标题会写解析为H标签
   - 由于这个H标签没有层级，主要就是样式上的字体大小
   - 拿到dom树的H标签后根据 H1 H2 H3 H1 H2 H2 相邻相同的为同级不相同的第二个H2则是H1的children子元素 其它Hn同样
   - 处理为tree结构数据，使用第三方框架渲染，点击时通过window.localtion.href= route.path+'#xxx' 跳转到对应的h标签(锚点)
3. md内容滚动使用intersectionObserver 检测h标签显示后 给目录组件赋值选中项
    - 这里的intersectionObserver 用一个数组记录，切换内容退出页面清除掉监听器
4. 另外就是内容区域使用的 markdown-it-anchor link点击后的锚点跳转；
    - 这里使用监听和路由守卫监听不到；
    - 我们使用window.addEventListener('hashchange') 监听变化做联动
