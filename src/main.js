import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import './registerServiceWorker'
import router from "./router";

import VueIziToast from "vue-izitoast";
import 'izitoast/dist/css/iziToast.min.css';
Vue.use(VueIziToast);

import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import { globalMixin }  from './mixins/';
Vue.mixin(globalMixin);

Vue.config.productionTip = false
Vue.config.devtools = true;

window.Vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')