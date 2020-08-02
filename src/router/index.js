import Vue from 'vue'
import VueRouter from 'vue-router'
import QrGenerator from '../views/qr-generator.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'QrGenerator',
        component: QrGenerator
    },
    {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router