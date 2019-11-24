import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: window.top.SS_UID,
    collapse: false,
    refresh: '',
    tagslist: [],
    activename: '制品单'
  },
  mutations: {
    toCollapse (state) {
      state.collapse = !state.collapse
    }
  },
  actions: {},
  modules: {}
})

export default store
