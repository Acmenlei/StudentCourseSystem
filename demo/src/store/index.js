import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerShow:false,
    loginShow:true
  },
  mutations: {
    updateRegister(state) {
      state.registerShow=!state.registerShow;
    },
    updateLogin(state) {
      state.loginShow=!state.loginShow;
    }
  },
  actions: {
  },
  modules: {
  }
})
