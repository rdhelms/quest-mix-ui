import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/components/Home.vue'
import Designs from '@/components/Designs.vue'
import Games from '@/components/Games.vue'
import Backgrounds from '@/components/Designs/Backgrounds.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/designs',
        name: 'designs',
        component: Designs,
        children: [
            {
                path: 'backgrounds',
                name: 'backgrounds',
                component: Backgrounds,
            },
        ],
    },
    {
        path: '/games',
        name: 'games',
        component: Games,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
