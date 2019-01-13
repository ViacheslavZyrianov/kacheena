import Vue from 'vue'
import Router from 'vue-router'

import ls from '@/utils/ls'

import Home from '@/pages/home'
import Auth from '@/pages/auth'
import Profile from '@/pages/profile'

Vue.use(Router)

const router = new Router({
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

router.beforeEach((to, from, next) => {
  if (!ls.get('kacheena__user')) next()
  router.replace('auth')
})

export default router
