// createWebHashHistory
import { createRouter, createWebHistory} from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import {basicRoutes} from './pages'
const root = {
    name: '/',
    redirect: '/home',
}
const router_ = createRouter({
    history: createWebHistory(),
    routes: [
        ...basicRoutes,
        root
    ] as unknown as RouteRecordRaw[],
    strict: true,
});
export const router = router_;