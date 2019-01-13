import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Auth from '@/pages/auth'
import Profile from '@/pages/profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
