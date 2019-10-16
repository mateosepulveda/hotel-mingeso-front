import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
export const rest_ip = "http://tingeso.tk:8080/tingeso/";

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
    },
    {
      path: '/bookings/create',
      name: 'bookingCreate',
      component: () => import('./views/BookingCreate.vue')
    },
    {
      path: '/bookings/update',
      name: 'bookingUpdate',
      component: () => import('./views/BookingUpdate.vue')
    },
    {
      path: '/bookings/read',
      name: 'bookingRead',
      component: () => import('./views/BookingRead.vue')
    },
    {
      path: '/bookings/delete',
      name: 'bookingDelete',
      component: () => import('./views/BookingDelete.vue')
    },
  ]
})
