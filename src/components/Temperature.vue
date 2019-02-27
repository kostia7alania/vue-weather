<template>
  <section>
    <div class="temperature__value">{{ (celsius)? value : fValue }}</div>
    <div class="temperature__right">
      <div class="temperature__scale">
        <a href="#" @click.prevent="celsiusToggle" v-tooltip="`To ${!celsius?'celsius':'fahrenheit'}`">&deg;{{ celsius?'C':'F' }}</a>
      </div>
      <div class="temperature__high">
        <img src="../assets/icons/high.svg" alt="high temperature">
        <span>{{ celsius ? high : fHigh }}</span>&deg;
      </div>
      <div class="temperature__low">
        <img src="../assets/icons/low.svg" alt="low temperature">
        <span>{{ celsius ? low : fLow }}</span>&deg;
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Temperature",  
  computed: { 
    value() { return this.$store.state.temperature.value},
    high() { return this.$store.state.temperature.high},
    low() { return   this.$store.state.temperature.low},
    celsius() { return this.$store.state.celsius; },
    fValue() { return this.toFahrenheit(this.value); }, 
    fHigh() { return this.toFahrenheit(this.high); },
    fLow() { return this.toFahrenheit(this.low); }
  },
  methods: {
    toFahrenheit(value) { return Math.floor(value * 1.8 + 32); },
    celsiusToggle() { this.$store.commit("toggle", { prop: "celsius" }); }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.temperature__value {
  font-size: 7em;
  color: rgba(255, 255, 255, 0.75);
}

.temperature__right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.temperature__scale {
  padding-top: 5px;
  font-size: 2em;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
}

.temperature__high {
  padding-top: 5px;
}

.temperature__high img {
  vertical-align: middle;
}

.temperature__low img {
  vertical-align: middle;
}
</style>
