import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    initData: null
  },
  getters: {
    getUser(state){
      return state.user
    },
    getInitData(state){
      return state.initData
    }
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setInitData(state, initData){
      state.initData = initData
    }
  }
})
