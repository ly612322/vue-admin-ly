import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import inputFilter from './utils/index'
import './assets/style/index.less'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import axios from 'axios'
import common from './utils/common'
import qs from 'qs'
import './permission'
// import './mock'

// 配置请求根路径
// axios.defaults.baseURL = 'http://10.1.10.1234'
// 使用拦截器 在请求头中加入token
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 最后必须return config
//   return config
// })

if (process.env.NODE_ENV == 'development') {//开发环境
  axios.defaults.baseURL = '/api';
} else if (process.env.NODE_ENV == 'production') {//生产环境
  axios.defaults.baseURL = 'http://10.1.10.211';
}

Vue.prototype.common = common // 公共方法
Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.use(ElementUI, {
  locale
})
Vue.use(inputFilter)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
