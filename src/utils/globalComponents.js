import Vue from 'vue'

import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import avatar from '@/components/avatar'
import faIcon from '@/components/faIcon'
import confirmDialog from '@/components/confirmDialog'

Vue.use(Croppa)
Vue.component('fa-icon', faIcon)
Vue.component('avatar', avatar)
Vue.component('confirm-dialog', confirmDialog)
