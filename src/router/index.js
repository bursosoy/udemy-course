import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/adding-goals-vanilla',
    name: 'Adding-Goals-Vanilla',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/adding-goals-vanilla.vue')
  },
  {
    path: '/adding-goals-vue',
    name: 'Adding-Goals-Vue',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/adding-goals-vue.vue')
  },
  {
    path: '/basic-counter.vue',
    name: 'Basic-Counter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/basic-counter.vue')
  },
  {
    path: '/monster-mania.vue',
    name: 'Monster-Mania',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/monster-mania.vue')
  },
  {
    path: '/contact-list.vue',
    name: 'Contact-List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/contact-list.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
