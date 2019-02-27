const state = {
  tokenOpenWeather: "a3e7bdc246b811691b06aab13ccb0dbb",
  tokenGoogleMap: "AIzaSyAAFOmrJq6MZXgYg42dfA-vsu9nVD8amhQ",
  tokenIpstack:"5fd8d637b290b3d7cecf4c81cfbf7fcc",
  celsius: true,
  positionEnabled: false,
  favorites: {},
  getTime: () => `${(new Date).getHours()}:${(new Date).getMinutes()}:${(new Date).getSeconds()}`,
  measurements: {
    cloudiness: 0,
    windSpeed: 0,
    humidity: 0
  },
  temperature: {
    value: 0,
    high: 0,
    low: 0
  },
  weather: {
    location: null, 
    description: 'Connection isn\'t available!',
    icon: require("../assets/icons/weather/cloud.svg")
  },
  loading: false
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