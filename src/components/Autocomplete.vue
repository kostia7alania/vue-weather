<template>
  <section class="autocomplete">
    <vue-google-autocomplete
      ref="address"
      id="map"
      class="form-control"
      placeholder="Please type your address"
      @placechanged="getAddressData"
      @no-results-found="notFoundHandler"
      @error="errorHandler"
      :enableGeolocation="!!1"
    />
    <a v-if="address" href="#" title="Search weather" @click="searchCustomWeather">
      <i class="fa fa-search" aria-hidden="true"></i>
    </a>
    <a v-if="address" href="#" title="Add to favorites" @click="addToFavorites">
      <i class="fa fa-plus" aria-hidden="true"></i>
    </a>
  </section>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  components: { VueGoogleAutocomplete },
  name: "Autocomplete",
  data() {
    return {
      address: null
    };
  },
  mounted() {  
    this.$refs.address.focus();  // Here we make focus on the user input
  },
  computed: {

  },
  watch: {
    positionEnabled(neww, old) {
      if(neww) {
        this.$refs.address.clear();
        this.address = null;
      }
    }
  },
  methods: {
    searchCustomWeather() {
      this.$store.dispatch('searchCustomWeather', {latitude:this.address.latitude, longitude: this.address.longitude})
  },

    addToFavorites() {
      let state = this.address;
    if( !(state.id in this.$store.state.favorites)) {
      state = {
        adr_address: state.adr_address,
        formatted_address: state.formatted_address,
        id: state.id,
        latitude: state.latitude,
        longitude: state.longitude
      }
      this.$store.commit("appendToFavorite", { prop: 'favorites', state: state });
    }
    else  this.$toast.info("The city is already added!!",this.getTime(),this.alertOptions);
      
    },
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData (addressData, placeResultData, id) {
      this.address = {...addressData, ...placeResultData};
      console.log(arguments);
      this.$emit('address-select', {longitude: addressData.longitude, latitude: addressData.latitude});
    },
    notFoundHandler(){
      console.log('notFound=>', arguments)
      this.$toast.error("Please, choose an address from the dropdown list!", this.getTime(), this.alertOptions)
    },
    errorHandler() {
      console.log('errorHandler=>', arguments)
      this.$toast.error("An error has occurred!", this.getTime(), this.alertOptions)
    }
  },
  
  mounted() {
    this.initLocalStorage('Autocomplete');
  }

};
</script>

<style scoped lang="scss">
.autocomplete {
  /*height: 4vh;*/
  display: flex;
  
    align-items: center;
    
  a {margin:3px;}
  input {
    border-radius: 10px;
    padding: 10px;
    font-size: 16px;
  }
}
.google-autocomplete {
  margin: auto;
  width: auto;
  font-size: 100%;
  padding: 1em;
}
</style>

