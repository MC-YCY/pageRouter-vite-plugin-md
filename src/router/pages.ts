
import { Study } from '/@/router/mds';
let mdsPage:any = [];

const computedDataLabel = (data:any) => {
    data.map((item:any) => {
        if (item.children && item.children.length) computedDataLabel(item.children);
        else mdsPage.push({
            path: encodeURI(item.key),
            component: () => import(`/@/Markdowns/${item.key}.md`),
        })
    })
}
computedDataLabel(Study);


const Home = {
    path: '/home',
    name: 'home',
    component: () => import('/@/views/Home/index.vue'),
    meta: {
        title: '首页',
        keepAlive: false,
        name: 'home'
    },
}

const Menus = {
    path:'/study',
    component: () => import('/@/views/Study/index.vue'),
    children:[
        // {
        //     path:'hello world',
        //     component: () => import('/@/components/HelloWorld.vue'),
        // },
        // {
        //     path:encodeURI('CSS_基础_剧中'),
        //     component: () => import('/@/Markdowns/CSS_基础_剧中.md'),
        // }
        ...mdsPage
    ]
}
export const basicRoutes = [
    Home,
    Menus
]