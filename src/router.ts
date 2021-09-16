import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/components/Home.vue'
import Studio from '@/components/Studio.vue'
import Arcade from '@/components/Arcade.vue'
import World from '@/components/Design/World.vue'
import Background from '@/components/Design/Background.vue'
import Entity from '@/components/Design/Entity.vue'
import ObjectStudio from '@/components/Design/ObjectStudio.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/design',
        name: 'design',
        component: Studio,
        children: [
            {
                path: 'world',
                name: 'world',
                component: World,
            },
            {
                path: 'background',
                name: 'background',
                component: Background,
            },
            {
                path: 'entity',
                name: 'entity',
                component: Entity,
            },
            {
                path: 'object',
                name: 'object',
                component: ObjectStudio,
            },
        ],
    },
    {
        path: '/play',
        name: 'play',
        component: Arcade,
    },
    {
        path: '*',
        redirect: '/',
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
