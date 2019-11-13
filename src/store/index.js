import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:window.top.SS_UID,
    collapse: false
  },
  mutations: {
    toCollapse (state) {
      state.collapse = !state.collapse
    }
  },
  actions: {
  },
  modules: {
  }
})
