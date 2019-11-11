import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/index.less'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import axios from 'axios'
import qs from "qs"



import './permission'
import './mock'

import store from './store/index'

Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.use(ElementUI, {
  locale
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
