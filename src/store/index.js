import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    initData: null,
    shop: null,
    home: null,
    powerStation: null,
    workshop: null,
    farm: null,
    referrals: null,
    showModal: false
  },
  getters: {
    getUser(state){
      return state.user
    },
    getInitData(state){
      return state.initData
    },
    getShop(state){
      return state.shop
    },
    getHome(state){
      return state.home
    },
    getPowerStation(state){
      return state.powerStation
    },
    getWorkShop(state){
      return state.workshop
    },
    getFarm(state){
      return state.farm
    },
    getReferrals(state){
      return state.referrals
    },
    getShowModal(state){
      return state.showModal
    }
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
    setInitData(state, initData){
      state.initData = initData
    },
    setShop(state, shop){
      state.shop = shop
    },
    setHome(state, home){
      state.home = home
    },
    setPowerStation(state, powerStation){
      state.powerStation = powerStation
    },
    setWorkShop(state, workshop){
      state.workshop = workshop
    },
    setFarm(state, farm){
      state.farm = farm
    },
    setReferrals(state, referrals){
      state.referrals = referrals
    },
    setShowModal(state, showModal){
      state.showModal = showModal
    }
  }
})
