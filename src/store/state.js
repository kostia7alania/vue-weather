export default { 
    tokenOpenWeather: "a3e7bdc246b811691b06aab13ccb0dbb",
    tokenGoogleMap: "AIzaSyAAFOmrJq6MZXgYg42dfA-vsu9nVD8amhQ",
    tokenIpstack:"5fd8d637b290b3d7cecf4c81cfbf7fcc",
    celsius: true,
    positionEnabled: false,
    favorites: {},
    getTime:() => {
      let d = new Date;
      let sec = d.getSeconds();
      sec = sec<10?'0'+sec:sec;
      let min = d.getMinutes();
      min = min<10?'0'+min:min;
      return `${d.getHours()}:${min}:${sec}`;
    },
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
 