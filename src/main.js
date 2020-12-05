import Vue from 'vue'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import App from './App.vue'
import router from './router/index'
import store from './store'

import toast from 'components/common/toast'

Vue.prototype.$bus = new Vue()

Vue.use(toast)

Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

// 解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  el:'#app',
  router,
  store,
  render:h=>h(App)
})

