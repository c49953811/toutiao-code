import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// 1. 引入你需要的组件
import Vant from 'vant'
// 2. 引入组件样式
import 'vant/lib/index.css'
// 加载全局样式
import './styles/index.less'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
