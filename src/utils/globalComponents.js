import Vue from 'vue'

import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
import avatar from '@/components/shared/avatar'
import faIcon from '@/components/shared/faIcon'
import confirmDialog from '@/components/shared/confirmDialog'

Vue.use(Croppa)
Vue.component('fa-icon', faIcon)
Vue.component('avatar', avatar)
Vue.component('confirm-dialog', confirmDialog)
