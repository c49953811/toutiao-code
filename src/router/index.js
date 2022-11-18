import Vue from 'vue'
import VueRouer from 'vue-router'
import Login from '@/views/Login'
Vue.use(VueRouer)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  }
]

const router = new VueRouer({
  routes
})
export default router
