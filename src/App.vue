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
@import "./assets/global-styles.scss";
</style>
