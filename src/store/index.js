import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    username: ''
  },
  mutations: {
    setSid (state, value) {
      state.sid = value
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setUserInfo (state, value) {
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    setisLogin (state, value) {
      state.isLogin = value
    },
    setinit (state) {
      state.token = ''
      state.userInfo = ''
      state.isLogin = false
    }
  },
  actions: {
  },
  modules: {
  }
})
