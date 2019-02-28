<template>
  <nav>
    <button
      class="locateBtn"
      :class="{pulse: positionEnabled}"
      @click="getPosition"
      v-tooltip="positionEnabled?'Update my weather':'Get my weather'"
    >
      <i class="fa fa-location-arrow" aria-hidden="true"></i>
    </button>
    
    <button
      id="unitBtn"
      @click="celsiusToggle"
      v-tooltip="`To ${!celsius?'celsius':'fahrenheit'}`"
    >{{celsius?'c':'f'}}</button>
    
    <button
      class="locateBtn"
      @click="routeToggle"
      :class="{on: favoritesOpen}"
      v-tooltip="`${favoritesOpen?'Hide':'Show'} favorites`"
    >
      <i class="fa fa-star" aria-hidden="true"/>
    </button>
    
    <button class="locateBtn" v-tooltip="status.tooltip" @click="statusBtnClick">
      <i :class="status.class" aria-hidden="true"/>
    </button>
  </nav>
</template>
 
<script>
export default {
  name: "AppNav",
  data() {
    return {
      favoritesOpen: null,
      online: navigator.onLine,
    };
  },
  methods: {
    statusBtnClick() {
      this.online = navigator.onLine;
      let loading = { method: "info", text: " Loading..Please wait..." };
      let offline = { method: "warning", text: "You offline. Please check connection!" };
      let okay = { method: "success", text: "Status: All fine!" };
      let out = this.loading ? loading : !this.online ? offline : okay;
      this.$toast[out.method](out.text, this.getTime(),this.alertOptions);
    },
    routeToggle() {
      if (this.$router.history.current.name == "Favorites") {
        this.favoritesOpen = false;
        this.$router.push({ name: "Home" });
      } else {
        this.favoritesOpen = true;
        this.$router.push({ name: "Favorites" });
      }
    },
    getPosition() {
      this.$store.dispatch("getPosition");
    },
    celsiusToggle() {
      this.$store.commit("toggle", { prop: "celsius" });
    }
  },

  computed: {
    status() {
      let loading = { tooltip: "Loading", class: "fas fa-spinner fa-pulse" };
      let offline = { tooltip: "Offline", class: "fa fa-ban" };
      let okay = { tooltip: "OK", class: "fa fa-check" };
      return this.loading ? loading : !this.online ? offline : okay;
    },
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
