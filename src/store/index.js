import Vue from 'vue'
import Vuex from 'vuex'
import WebSocket from '../util/websocket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {},
    username: '',
    ws: null,
    num: 0
  },
  mutations: {
    initWebSocket (state, config) {
      state.ws = new WebSocket(config)
      state.ws.init()
    },
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
    },
    setMessage (state, value) {
      state.num = value
    }
  },
  actions: {
    message ({ commit }, msg) {
      this.commit('setMessage', msg)
    }
  },
  modules: {
  }
})
