import Vue from 'vue'

import router from './router'

// 引入element ui
import ElementUI, { MessageBox } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import './assets/css/global.css'
import App from './App.vue'
// 引入axios
import axios from 'axios'
// 设置axios默认地址
axios.defaults.baseURL='https://lianghj.top:8888/api/private/v1/'
// 挂载请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 把axios封装到Vue原型对象中
Vue.prototype.$http = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
