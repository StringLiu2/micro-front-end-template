import VueRouter from 'vue-router';
import Menu from '../views/Menu.vue';

export default new VueRouter({
    mode: 'history', 
    routes: [
        {
            path: '/',
            component: Menu
        },
        {
            path: '/404',
            component: () => import('../views/NotFound.vue'),
        }
    ]
})