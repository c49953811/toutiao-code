import Vue from 'vue'
import Vuex from 'vuex'
import caragtory from './modules/catagtory'
import newlist from './modules/newlist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    caragtory,
    newlist
  }
})
