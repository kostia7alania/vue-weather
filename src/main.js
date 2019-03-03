import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import './registerServiceWorker'
import router from "./router";
import VueIziToast from "vue-izitoast";
import 'izitoast/dist/css/iziToast.min.css';
Vue.use(VueIziToast, { position: "bottomRight" } );

import "./assets/styles/tooltip.scss"
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import { globalMixin }  from './mixins/';
Vue.mixin(globalMixin);

import "./assets/styles/global-styles.scss"

let _ = Vue.config;
    _.devtools = !(_.productionTip = ! // <-- 😄
  (
    window.Vue = new Vue({
      router,
      store,
      render: h => h(App)
    })
    .$mount('#app')
  ))