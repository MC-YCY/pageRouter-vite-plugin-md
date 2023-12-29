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
        {
            path:'hello world',
            component: () => import('/@/components/HelloWorld.vue'),
        },
        {
            path:'md',
            component: () => import('/@/Markdowns/Study/Css/基础_剧中.md'),
        }
    ]
}
export const basicRoutes = [
    Home,
    Menus
]