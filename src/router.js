import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
export const rest_ip = "http://localhost:8080/";

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
      path: '/users/manage',
      name: 'userManage',
      component: () => import('./views/UserManage.vue')
    },
    {
      path: '/rooms/manage',
      name: 'roomManage',
      component: () => import('./views/RoomManage.vue')
    }
  ]
})
