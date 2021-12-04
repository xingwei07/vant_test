import Vue from 'vue'
import App from './App.vue'
// import axios from 'axios'
import VueRouter from 'vue-router'
import router from './router/index'
import store from '@/store/index'
import './styles/index.css'

Vue.config.productionTip = false

// Vue.use(axios)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
