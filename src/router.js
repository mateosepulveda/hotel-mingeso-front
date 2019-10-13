import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/rack',
      name: 'rack',
      component: () => import('./views/Rack.vue')
    },
    {
      path: '/users/create',
      name: 'userCreate',
      component: () => import('./views/UserCreate.vue')
    },
    {
      path: '/rooms/create',
      name: 'roomCreate',
      component: () => import('./views/RoomCreate.vue')
    }
  ]
})
