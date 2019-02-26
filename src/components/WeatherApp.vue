<template>
  <main :class="period">
    <AppNav @get-position="getPosition"/>
    <Measurements :cloudiness="cloudiness" :windSpeed="windSpeed" :humidity="humidity"></Measurements>

    <Temperature :value="temperatureValue" :high="temperatureHigh" :low="temperatureLow"></Temperature>

    <Weather v-if="location" :location="location" :description="description" :icon="weatherIcon"></Weather>
    <section>
      <a id="unitBtn" @click="$router.push('Custom')">Choose city</a>
    </section>
  </main>
</template>

<script>
import Weather from "./Weather";
import AppNav from "./AppNav";
import Temperature from "./Temperature";
import Measurements from "./Measurements";
import axios from "axios";

export default {
  name: "WeatherApp",
  components: {
    AppNav,
    Weather,
    Temperature,
    Measurements
  },

  data() {
    return {
      cloudiness: 0,
      windSpeed: 0,
      humidity: 0,
      temperatureValue: 0,
      temperatureHigh: 0,
      temperatureLow: 0,
      location: null,
      description: "Internet isn't available!",
      weatherIcon: require("../assets/icons/weather/cloud.svg")
    };
  },
  computed: {
    onLine() {
      return navigator.onLine;
    }
  },
  watch: {},

  methods: {
    getPosition() {
      console.log("getPosition");
      if (this.onLine) {
        navigator.geolocation.getCurrentPosition(position => {
          this.updateForecast(position.coords);
        });
      } else {
        console.log("can`t get geo, try by ip");
        axios
          .get("http://ip-api.com/json")
          .then(e => {
            this.updateForecast({ latitude: e.lat, longitude: e.lon });
          })
          .catch(err => console.warn("error => ip => ", err));
      }
    },
    // Обновляем погоду по полученным координатам @param {Object} position - Lat & lon coordinates object.
    async updateForecast(coords) {
      let data;
      try {
        data = await this.getForecast(coords);
      } catch (e) {
        data = {
          clouds: { all: 0 },
          wind: { speed: 0 },
          main: {
            humidity: 0,
            temp: 0,
            temp_max: 0,
            temp_min: 0
          },
          weather: [
            {
              id: 0,
              description: `There's a problem at the weather forecast server ¯\\_(ツ)_/¯`
            }
          ],
          name: null,
          sys: {
            country: null
          }
        };
      }
      this.populate(data);
    },

    async getForecast(coordinates) {
      let appId = this.$store.state.tokenOpenWeather;
      if (!appId) throw "Не задан токен Open Weather!";
      let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${
        coordinates.latitude
      }&lon=${coordinates.longitude}&appid=${appId}&units=metric`;
      let response = await fetch(endpoint);
      this.$store.commit("toggle", { prop: "positionEnabled" });
      return await response.json();
    },

    // обновляем данные в рендере - @param {Object} data - Weather forecast json data.
    populate(data) {
      this.cloudiness = data.clouds.all;
      this.windSpeed = data.wind.speed;
      this.humidity = data.main.humidity;
      this.temperatureValue = Math.round(data.main.temp);
      this.temperatureHigh = Math.round(data.main.temp_max);
      this.temperatureLow = Math.round(data.main.temp_min);
      this.location = this.formatLocation(data.name, data.sys.country);
      this.description = data.weather[0].description;
      this.weatherIcon = this.getWeatherIcon(data.weather[0].id);
      this.setLocalStorage("WeatherApp");
    },
    formatLocation: (city, country) =>
      `${city ? city + "," : ""} ${country ? country : ""}`,
    // Получаем иконку на основе его ID @param {Number} id - Weather ID.
    getWeatherIcon(id) {
      if (this.isThunderstorm(id)) {
        return require("../assets/icons/weather/thunderstorm.svg");
      }
      if (this.isDrizzle(id) || this.isRain(id)) {
        return require("../assets/icons/weather/rain.svg");
      }
      if (this.isSnow(id)) {
        return require("../assets/icons/weather/snow.svg");
      }
      return require("../assets/icons/weather/cloud.svg");
    },
    // гроза   @param {Number} id - Weather ID.
    isThunderstorm: id => id > 199 && id < 233,
    //  моросит @param {Number} id - Weather ID.
    isDrizzle: id => id > 299 && id < 322,
    //  Дождь   @param {Number} id - Weather ID.
    isRain: id => id > 499 && id < 532,
    //  снег   @param {Number} id - Weather ID.
    isSnow: id => id > 599 && id < 623,


    initLocalStorage(name) {
      if (localStorage) {
        if (localStorage.getItem(name)) {
            let local = JSON.parse(localStorage.getItem(name));
            Object.keys(local).forEach(key=>this[key]=local[key]);
        }
      } else {
        console.log("localStorage isn't support!");
      }
    },

    setLocalStorage(name) {
        window.t = this;
      if (localStorage) {
        localStorage.setItem(name, JSON.stringify(this._data));
      } else {
        console.log("localStorage isn't support!");
      }
    }
  },

  mounted() {
      
    this.initLocalStorage("WeatherApp");
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
