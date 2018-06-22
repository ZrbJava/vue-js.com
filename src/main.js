import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import {
  routerMode
} from './common/config/env'
import store from './store/index'
import App from './App'

import '../static/css/global.css'

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
})

new Vue({
  router,
  store,
}).$mount('#app')
