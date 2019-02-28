function setVuexStorage(){ Vue.setVuex() }

export default { 

  changeProp (store, {prop, state}) {
    console.log(arguments)
    store[prop] = state;
    setVuexStorage();
  },

  changeObj (store, {obj, prop, state}) {
    console.log(arguments)
    store[obj][prop] = state;
    setVuexStorage();
  },

  toggle (store, {prop}) { 
    store[prop] = !store[prop];
    setVuexStorage();
  },  
  
  appendToFavorite (store, {prop, state}) {
    Vue.$set(store[prop], state.id, state);
    setVuexStorage(); 
  },
  
  setObj (store, {prop, state}) {
    Vue.$set(store, prop, state);
    setVuexStorage();
  },

  deleteCity (store, id) {
    console.log(arguments, store.favorites[id])
    //delete store.favorites[id]
    Vue.$delete(store.favorites, id);
  },
}
 