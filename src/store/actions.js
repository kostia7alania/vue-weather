import axios from 'axios'; 


export default {
    searchCustomWeather({state, commit, dispatch}, coordinates ) {
        dispatch('updateForecast', coordinates)
        commit("changeProp", { prop: 'positionEnabled', state: false });
    }, 
    getPosition({state, commit, dispatch}) {
         if (navigator.onLine) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => dispatch('updateForecast', position.coords ) );
          } else {
            Vue.$toast.info( "The browser does not support geolocation. We trying to determine you position by ip address!", Vue.getTime());
            let url = "http://api.ipstack.com/check?access_key=" + state.tokenIpstack;
            console.log("can`t get geo, try by ip", url); 
            
            commit("changeProp", { prop: 'loading', state: true});

            axios 
                  .get(url).then(e => dispatch('updateForecast',{ coordinates: e.data} ) )
                  .catch(err =>{
                      Vue.$toast.info("Can't get your position via ip-checker!", Vue.getTime());
                      
                      commit("changeProp", { prop: 'loading', state: false});

                  });
          }

            // position available:
            commit("changeProp", { prop: 'positionEnabled', state: true });
            //this.$store.commit("toggle", { prop: "positionEnabled" });
   
        } else {
          Vue.$toast.info ("Please, connect to Internet!", Vue.getTime());
        }
      },

      // Обновляем погоду по полученным координатам @param {Object} position - Lat & lon coordinates object.
      async updateForecast({state, commit, dispatch}, coordinates) {
        commit("changeProp", { prop: 'loading', state: true});
        let data;
        try {
          data = await dispatch('getForecast', coordinates);
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
        dispatch('populate', { data } );
        Vue.$toast.success( "Weather updated!", Vue.getTime() );
        commit("changeProp", { prop: 'loading', state: false});
      },
  
      async getForecast({state, commit, dispatch}, coordinates) {
          console.log('coordinates',coordinates)
        let appId = state.tokenOpenWeather;
        if (!appId) throw "Не задан токен Open Weather!";
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${ coordinates.latitude }&lon=${coordinates.longitude}&appid=${appId}&units=metric`;
        let response = await fetch(endpoint); 
        return await response.json();
      },
  
      // обновляем данные в рендере - @param {Object} data - Weather forecast json data.
      populate({commit}, {data}) {

        console.log('data', data)
          // Реактим иконку на основе его ID @param {Number} id - Weather ID:
          // гроза   @param {Number} id - Weather ID.
          let isThunderstorm = id => id > 199 && id < 233;
          //  моросит @param {Number} id - Weather ID.
          let isDrizzle = id => id > 299 && id < 322;
          //  Дождь   @param {Number} id - Weather ID.
          let isRain = id => id > 499 && id < 532;
          //  снег   @param {Number} id - Weather ID.
          let isSnow = id => id > 599 && id < 623;
          
          let getWeatherIcon = id => {
              if (isThunderstorm(id))          return require("../assets/icons/weather/thunderstorm.svg");
              if (isDrizzle(id) || isRain(id)) return require("../assets/icons/weather/rain.svg");
              if (isSnow(id))                  return require("../assets/icons/weather/snow.svg");
                                               return require("../assets/icons/weather/cloud.svg");
          }

        let formatLocation = (city, country) => `${city ? city + "," : ""} ${country ? country : ""}`;

        let measurements = {
            cloudiness: data.clouds.all,
            windSpeed: data.wind.speed,
            humidity: data.main.humidity
        }
        let temperature = {
            value: Math.round(data.main.temp),
            high: Math.round(data.main.temp_max),
            low:  Math.round(data.main.temp_min)
        }
        let weather = {
            location: formatLocation(data.name, data.sys.country),
            description:  data.weather[0].description,
            icon: getWeatherIcon(data.weather[0].id)
        }
        commit("setObj", { prop: 'measurements',state: measurements });
        commit("setObj", { prop: 'temperature', state: temperature  });
        commit("setObj", { prop: 'weather',     state: weather      });
    }
}