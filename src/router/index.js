import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/pages/auth'
import Profile from '@/components/pages/profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
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
