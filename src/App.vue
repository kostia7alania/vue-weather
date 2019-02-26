<template>
  <div id="app">
    <div class="app"  :class="period">
      <WeatherApp :class="period"/>
      <router-view :class="period"/>
      <AppCredits :class="period"/>
    </div>
  </div>
</template>
<script>

import WeatherApp from './components/WeatherApp'
import AppCredits from './components/AppCredits'

export default {
  name: 'app',
  components: {
    WeatherApp,
    AppCredits
  }, 
  data() {
    return {
     
    }
  },  
}
</script>
<style lang="scss">
@import './assets/global-styles.scss';
</style>
