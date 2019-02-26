<template>
  <footer>
    <small>© <b><a href="https://github.com/kostia7alania" target="_blank" rel="noopener">
      Kostia7alania</a></b> {{ year }} - for 
      <cite>
        <router-link class="logo-font" to="">UTair</router-link>
      </cite> Interview
    </small>
  </footer>
</template>

<script>
export default {
  name: 'AppCredits',
  computed: {
    year: ()=>(new Date).getFullYear()
  } 
}
</script>

<style scoped>
footer {
  text-align: center;
  position: absolute;
  bottom: 10px;
  visibility: hidden;
}

@media screen and (min-width: 450px) {
  footer {
    visibility: visible;
  }
}
</style>
