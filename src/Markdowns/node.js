let allPage = [{"name":"互联网公司大盘点","routerKey":"面试题_互联网公司大盘点","key":"面试题_互联网公司大盘点","label":"互联网公司大盘点","title":"互联网公司大盘点"},{"name":"前端学习路线","routerKey":"面试题_前端学习路线","key":"面试题_前端学习路线","label":"前端学习路线","title":"前端学习路线"},{"name":"前端面试准备","routerKey":"面试题_前端面试准备","key":"面试题_前端面试准备","label":"前端面试准备","title":"前端面试准备"},{"name":"前端面试题之HTML篇","routerKey":"面试题_前端面试题之HTML篇","key":"面试题_前端面试题之HTML篇","label":"前端面试题之HTML篇","title":"前端面试题之HTML篇"},{"name":"前端面试题之CSS篇","routerKey":"面试题_前端面试题之CSS篇","key":"面试题_前端面试题之CSS篇","label":"前端面试题之CSS篇","title":"前端面试题之CSS篇"},{"name":"前端面试题之JavaScript篇","routerKey":"面试题_前端面试题之JavaScript篇","key":"面试题_前端面试题之JavaScript篇","label":"前端面试题之JavaScript篇","title":"前端面试题之JavaScript篇"},{"name":"前端面试题之Vue篇","routerKey":"面试题_前端面试题之Vue篇","key":"面试题_前端面试题之Vue篇","label":"前端面试题之Vue篇","title":"前端面试题之Vue篇"},{"name":"前端面试题之React篇","routerKey":"面试题_前端面试题之React篇","key":"面试题_前端面试题之React篇","label":"前端面试题之React篇","title":"前端面试题之React篇"},{"name":"前端面试题之性能优化篇","routerKey":"面试题_前端面试题之性能优化篇","key":"面试题_前端面试题之性能优化篇","label":"前端面试题之性能优化篇","title":"前端面试题之性能优化篇"},{"name":"前端面试题之前端工程化篇","routerKey":"面试题_前端面试题之前端工程化篇","key":"面试题_前端面试题之前端工程化篇","label":"前端面试题之前端工程化篇","title":"前端面试题之前端工程化篇"},{"name":"前端面试题之计算机网络篇","routerKey":"面试题_前端面试题之计算机网络篇","key":"面试题_前端面试题之计算机网络篇","label":"前端面试题之计算机网络篇","title":"前端面试题之计算机网络篇"},{"name":"前端面试题之浏览器原理篇","routerKey":"面试题_前端面试题之浏览器原理篇","key":"面试题_前端面试题之浏览器原理篇","label":"前端面试题之浏览器原理篇","title":"前端面试题之浏览器原理篇"},{"name":"前端面试题之手写代码篇","routerKey":"面试题_前端面试题之手写代码篇","key":"面试题_前端面试题之手写代码篇","label":"前端面试题之手写代码篇","title":"前端面试题之手写代码篇"},{"name":"前端面试题之代码输出篇","routerKey":"面试题_前端面试题之代码输出篇","key":"面试题_前端面试题之代码输出篇","label":"前端面试题之代码输出篇","title":"前端面试题之代码输出篇"},{"name":"LeetCode 高频题目分类列表","routerKey":"面试题_LeetCode","key":"面试题_LeetCode","label":"LeetCode 高频题目分类列表","title":"LeetCode 高频题目分类列表"}];
import fs from 'fs';

allPage.map((item) => {
    fs.writeFile(item.key + '.md', '# '+item.key, (error) => {
        // 创建失败
        if (error) {
            console.log(`创建失败：${error}`)
        }
        // 创建成功
        console.log(`创建成功！`)
    })
})
