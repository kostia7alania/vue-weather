<template>
  <nav>
    <button class="locateBtn" :class="{pulse: positionEnabled}" @click="getPosition" v-tooltip="positionEnabled?'Update my weather':'Get my weather'">
      <i class="fa fa-location-arrow" aria-hidden="true"></i>
    </button>
    
    <button v-if="!loading" id="unitBtn" @click="celsiusToggle" v-tooltip="`To ${!celsius?'celsius':'fahrenheit'}`">{{celsius?'c':'f'}}</button>
    <button v-else id="unitBtn" v-tooltip="'loading'">
      <i class="fa fa-spin fa-pulse" aria-hidden="true"/>
    </button>
    
    <button class="locateBtn" @click="routeToggle" :class="{on: favoritesOpen}" v-tooltip="`${favoritesOpen?'Hide':'Show'} favorites`">
      <i class="fa fa-star" aria-hidden="true"/>
    </button>
		
  </nav>
</template>

<script>
export default {
	name: "AppNav",
	data(){
		return {
			favoritesOpen: null, 
		}
  },
  mounted() {
  
  },
  methods: {
		
    routeToggle () {
			if(this.$router.history.current.name == 'Favorites') {
				this.favoritesOpen = false;
				this.$router.push({name: 'Home'});
			} else {
				this.favoritesOpen = true;
				this.$router.push({name: 'Favorites'});
			}  
		},
		
    getPosition() {
      this.$store.dispatch("getPosition",{that:this, toast: this.$toast});
    },

    celsiusToggle() {
      this.$store.commit("toggle", { prop: "celsius" });
    }
  },

  computed: {
    loading() {
      return this.$store.state.loading;
    },
    celsius() {
      return this.$store.state.celsius;
    }
  }
};
</script>

<style scoped>
/*----------------
	Buttons
-----------------*/
button {
  border: none;
  cursor: pointer;
  margin: 4px;
}
nav {
  font-size: 1rem;
  margin: 0 auto;
  padding: 5% 0 10%;
}
.locateBtn,
#unitBtn {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  color: #fff;
  height: 40px;
  transition: background 1s ease-in-out, border 0.2s ease-in-out;
  width: 40px;
}
.locateBtn.on,
#unitBtn.on {
  background: rgba(255, 255, 255, 0.25);
}
.locateBtn:focus,
.locateBtn:hover,
#unitBtn:focus,
#unitBtn:hover {
  border: 1px solid rgba(255, 255, 255, 0.75);
}
.locateBtn {
  /*margin-right: 10px;*/
}
#unitBtn {
  font-weight: 300;
  padding-right: 3px;
  padding-top: 2px;
  text-transform: uppercase;
}
#unitBtn:before {
  content: "\00b0"; /* Degree symbol */
  padding: 1px;
}
/* locateBtn Pulse Animation */
.locateBtn.pulse {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  20% {
    background: rgba(255, 255, 255, 0.25);
  }
}
</style>
