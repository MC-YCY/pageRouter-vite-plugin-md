import { Study, Question } from '/@/router/mds';
let StudyPages: any = [];
let QuestionPages: any = [];
// 咱也不懂，用vue2的动态()=>import 抱有警告
// 该这种方式
const modules = import.meta.glob("../Markdowns/**.md");
const importModule = (_path: string) => {
    let path = '../Markdowns/' + _path
    return modules[path];
}
const computedDataLabel = (data: any, t: string) => {
    data.map((item: any) => {
        if (item.children && item.children.length) computedDataLabel(item.children, t);
        else {
            if (t == 'Study') {
                StudyPages.push({
                    path: encodeURI(item.key),
                    component: importModule(`${item.key}.md`),
                })
            } else if (t == 'Question') {
                QuestionPages.push({
                    path: encodeURI(item.key),
                    component: importModule(`${item.key}.md`),
                })
            }
        }
    })
}
computedDataLabel(Study, 'Study');
computedDataLabel(Question, 'Question');


const Home = {
    path: '/home',
    name: 'home',
    component: () => import('/@/views/Home/index.vue'),
    meta: {
        title: '首页',
        keepAlive: true,
        name: 'home'
    },
}

const StudyRouter = {
    path: '/study',
    component: () => import('/@/views/Study/index.vue'),
    children: [
        // {
        //     path:encodeURI('CSS_基础_剧中'),
        //     component: () => import('/@/Markdowns/CSS_基础_剧中.md'),
        // }
        ...StudyPages
    ]
}
const QuestionRouter = {
    path: '/question',
    name: 'question',
    component: () => import('/@/views/Question/index.vue'),
    meta: {
        title: '题库',
        name: 'question'
    },
    children: QuestionPages
}

const EchartsRouter = {
    path: '/echarts',
    name: 'echarts',
    component: () => import('/@/views/Echarts/index.vue'),
    meta: {
        title: 'echarts',
        name: 'echarts'
    },
    children:[]
}


export const basicRoutes = [
    Home,
    StudyRouter,
    QuestionRouter,
    EchartsRouter
]