<template>
  <div :class="period" class="app">
    <WeatherApp/>
    <router-view/>
    <AppCredits/>
  </div>
</template>


<script>
import WeatherApp from "./components/WeatherApp";
import AppCredits from "./components/AppCredits";

export default {
  name: "app",
  components: {
    WeatherApp,
    AppCredits
  },
  data() {
    return {};
  },
  methods: {
  },
  mounted() { // write to Store from localStorage
    this.initVuexStorage();
    if(this.description == 'Connection isn\'t available!') {
      this.$store.dispatch("getPosition");
    }
  },
  computed: {
    description() {
      return this.$store.state.weather.description
    }
  }
};
</script>
<style lang="scss">
 
.app--day  { ;background: linear-gradient(to bottom right, #6CB9C8, #6CB9C8) no-repeat; background-color: #6CB9C8;}
.app--night{background: linear-gradient(to bottom right, #484F60, #484F60) no-repeat; background-color: #484F60;}
.app--day a:hover  {color: rgba(46, 146, 167, 0.9);}
.app--night a:hover{color: rgba(0, 0, 0, 0.5);}

</style>

 