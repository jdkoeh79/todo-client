import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import Vuetify from 'vuetify'
import VueTextareaAutosize from 'vue-textarea-autosize'
import Panel from '@/components/globals/Panel'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueTextareaAutosize)
Vue.component('panel', Panel)

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
