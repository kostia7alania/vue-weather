const state = {
  tokenOpenWeather: "a3e7bdc246b811691b06aab13ccb0dbb",
  celsius: true,
  positionEnabled: false
}

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

window.store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store