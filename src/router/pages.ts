
import { Study, Question } from '/@/router/mds';
let StudyPages: any = [];
let QuestionPages: any = [];
const computedDataLabel = (data: any, t: string) => {
    data.map((item: any) => {
        if (item.children && item.children.length) computedDataLabel(item.children, t);
        else {
            if (t == 'Study') {
                StudyPages.push({
                    path: encodeURI(item.key),
                    component: () => import(`/@/Markdowns/${item.key}.md`),
                })
            } else if (t == 'Question') {
                QuestionPages.push({
                    path: encodeURI(item.key),
                    component: () => import(`/@/Markdowns/${item.key}.md`),
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
    component: () => import('../views/Home/index.vue'),
    meta: {
        title: '首页',
        keepAlive: false,
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
    component: () => import('../views/Question/index.vue'),
    meta: {
        title: '题库',
        name: 'question'
    },
    children:QuestionPages
}

export const basicRoutes = [
    Home,
    StudyRouter,
    QuestionRouter
]