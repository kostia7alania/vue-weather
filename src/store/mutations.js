export default { 

  changeProp (store, {prop, state}) {
    console.log(arguments)
    store[prop] = state;
    Vue.setVuexStorage();
  },

  changeObj (store, {obj, prop, state}) {
    console.log(arguments)
    store[obj][prop] = state;
    Vue.setVuexStorage();
  },

  toggle (store, {prop}) { 
    store[prop] = !store[prop];
    Vue.setVuexStorage();
  },  
  
  appendToFavorite (store, {prop, state}) {
    Vue.$set(store[prop], state.id, state);
    Vue.setVuexStorage();
  },
  setObj (store, {prop, state}) {
    Vue.$set(store, prop, state);
    Vue.setVuexStorage();
  },

  deleteCity (store, id) {
    console.log(arguments, store.favorites[id])
    //delete store.favorites[id]
    Vue.$delete(store.favorites, id);
  },
}
 