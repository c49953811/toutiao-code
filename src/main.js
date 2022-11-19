import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/vant'
// 加载全局样式

import './styles/index.less'
// import 'vant/lib/index.css'
// 加入移动端rem匹配
import 'amfe-flexible'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
