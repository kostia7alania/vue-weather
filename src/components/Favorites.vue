<template>
  <main>
    <h1>Favorites</h1>
    <div class="favorites">
      <ul class="menu">
        <li v-for="(e,i) in favoritesArray" :key="i">
          <span title="Show weather" @click="goFavSearch(e)">{{e.formatted_address}}</span>
          <em>
            <i title="Delete" @click="delFavRow(e)" class="fa fa-trash" aria-hidden="true"/>
          </em>
        </li>
      </ul>
      <h3 v-if="!favoritesArray.length">Empty</h3>
    </div>
  </main>
</template>

<script>
export default {
  name: "Favorites",
  components: {},

  watch: {
    favorites() {}
  },
  methods: {
    delFavRow(e) {
      this.$store.commit("deleteCity", e.id);
    },
    goFavSearch(e) {
      console.log("ADDFavRow");
      this.$store.dispatch("searchCustomWeather", e);
    }
  },
  computed: {
    favoritesArray() {
      let fav = this.$store.state.favorites;
      return Object.keys(fav).map(e => fav[e]);
    },
    favorites() {
      if (!this.$store.state.favorites) return false;
      return this.$store.state.favorites;
    }
  }
};
</script>

<style lang="scss" scoped>
.favorites {
  overflow: auto;
}

.menu {
  list-style: none;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  & > li {
    overflow: auto;
    padding: 6px 10px;
    /*font-size: 20px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  
  & > span {
    float: left;
    width: 75%;
    color: white;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }

  & > em {
    float: right;
    color: #9c836e;
    font-weight: bold;
    &:hover {
      color: black;
      cursor: pointer;
    }
  }}
}

main {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  h1 {
    text-align: center;
    padding-top: 10px;
  }
  h3 {
    padding-top: 10px;
    text-align: center;
  }
}
@media screen and (min-width: 450px) {
  main {
    width: 330px;
    height: 600px;
    border-radius: 5px;
  }
}
</style>
