import VueRouter, { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
    {
        path: '/vue',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/vue/news',
        component: () => import('../views/News.vue'),
    },
    {
        path: '/',
        redirect: '/vue',
    }
];

export default new VueRouter({
    // base: '/vue',
    routes,
    mode: 'history'
})