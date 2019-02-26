<template>
  <nav>
    <button id="locateBtn" :class="{pulse: positionEnabled}" @click="getPosition">
     <i class="fa fa-location-arrow" aria-hidden="true"></i>
    </button>
    <button id="unitBtn" @click="celsiusToggle">{{celsius?'c':'f'}}</button>
   
    
  </nav>
</template>

<script>
export default {
  name: "AppNav",
  methods: {
    getPosition() {
      this.$emit('get-position')
    },
    celsiusToggle() { 
      this.$store.commit('toggle',{prop: 'celsius'})
    }
  },
  
  computed: {
    positionEnabled(){
      return this.$store.state.positionEnabled
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
}
nav {
	font-size: 1rem;
	margin: 0 auto;
	padding: 5% 0 10%;
}
#locateBtn, #unitBtn {
	background: none;
	border: 1px solid rgba(255,255,255,0.25);
	border-radius: 50%;
	color: #fff;
	height: 40px;
	transition: background 1s ease-in-out, border 0.2s ease-in-out;
	width: 40px;
}
#locateBtn.on, #unitBtn.on {
	background: rgba(255,255,255,0.25);
}
#locateBtn:focus, #locateBtn:hover, #unitBtn:focus, #unitBtn:hover {
	border: 1px solid rgba(255,255,255,0.75);
}
#locateBtn {
	margin-right: 10px;
}
#unitBtn {
	font-weight: 300;
	padding-right: 3px;
	padding-top: 2px;
	text-transform: uppercase;
}
#unitBtn:before {
	content: '\00b0'; /* Degree symbol */
	padding: 1px;
}
/* locateBtn Pulse Animation */
#locateBtn.pulse {
	animation: pulse 2s infinite;
}
@keyframes pulse {
	20% { background: rgba(255,255,255,0.25); }
}


</style>
