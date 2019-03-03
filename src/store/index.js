import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from './state.js'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

const store = window.store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store;