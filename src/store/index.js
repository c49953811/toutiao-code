import Vue from 'vue'
import Vuex from 'vuex'
import caragtory from './modules/catagtory'
import newlist from './modules/newlist'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    // 参数1：固定的state
    // 参数2：传递过来的数据
    setUser(state, data) {
      // 保存到state
      state.user = data
      // 保存到localStorage
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {
    caragtory,
    newlist
  },
  getters: {}
})
