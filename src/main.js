// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

import faIcon from '@/components/shared/faIcon'
import avatar from '@/components/shared/avatar'

Vue.use(Vuetify)
Vue.use(Croppa)
Vue.component('fa-icon', faIcon)
Vue.component('avatar', avatar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
