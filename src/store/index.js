import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    endImport:false,
    data:{},
    user:{
      selectedGeoLevel:"national",
      selectedGeoCode:undefined
    },
    territoireData:{
      regional:{},
      departemental:{}
    }
  },
  mutations: {
    endImport (state,value) {
      state.endImport = value
    },
    initData (state,data) {
      state.data = data
    },
    setTerritoireData (state,payload) {
      state.territoireData[payload.level] = payload.data
    },
    setUserChoices (state,payload){
      state.user.selectedGeoLevel = payload.level
      state.user.selectedGeoCode = payload.code
    }
  }
})
