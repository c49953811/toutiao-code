import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 加载全局样式
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
