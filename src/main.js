import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import Panel from '@/components/globals/Panel'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.component('panel', Panel)

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
