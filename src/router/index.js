import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/pages/auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
