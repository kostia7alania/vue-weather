<template>
  <main :class="period">
    <AppNav/>
    <Autocomplete/>
    <Measurements/>
    <Temperature/>
    <Weather/>
  </main>
</template>

<script>
import Weather from "./Weather";
import AppNav from "./AppNav";
import Temperature from "./Temperature";
import Measurements from "./Measurements";
import Autocomplete from "./Autocomplete";


export default {
  name: "WeatherApp", 
  components: {
    AppNav,
    Weather,
    Temperature,
    Measurements,
    Autocomplete
  },

  data() {
    return { };
  }  
};
</script>

<style scoped>
main {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.app--day {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url("../assets/images/morning.jpg");
}

.app--night {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
    url("../assets/images/night.jpg");
}

@media screen and (min-width: 450px) {
  main {
    width: 330px;
    height: 600px;

    border-radius: 5px;
  }
}
</style>
