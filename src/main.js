import Vue from 'vue'

import App from './App.vue'
import router from './router'

import { BootstrapVue, BootstrapVueIcons, BBadge } from 'bootstrap-vue'
import './assets/main.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.component('b-badge', BBadge)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
