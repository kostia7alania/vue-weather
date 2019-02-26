import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import './registerServiceWorker' 

Vue.config.productionTip = false
Vue.config.devtools = true;
 
import router from "./router";

import globalMixin from './mixins/';
Vue.mixin(globalMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
