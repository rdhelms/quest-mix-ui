import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/components/Home.vue'
import Studio from '@/components/Studio.vue'
import Arcade from '@/components/Arcade.vue'
import World from '@/components/Studio/World.vue'
import Background from '@/components/Studio/Background.vue'
import Entity from '@/components/Studio/Entity.vue'
import ObjectStudio from '@/components/Studio/ObjectStudio.vue'
import Game from '@/components/Game.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/studio',
        name: 'studio',
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
        path: '/arcade',
        name: 'arcade',
        component: Arcade,
    },
    {
        path: '/play/:gameId',
        name: 'play',
        component: Game,
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
