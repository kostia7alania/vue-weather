const mutations = {
    setVuex() {
      if (localStorage) 
          localStorage.setItem('VuexStore', JSON.stringify({ ...this.state,favorites: {...this.state.favorites}}));
      else console.warn("localStorage isn't support!")
  },
  changeProp (store, {prop, state}) {
    store[prop] = state;
    this.commit('setVuex');
  },

  changeObj (store, {obj, prop, state}) {
    store[obj][prop] = state;
    this.commit('setVuex');
  },

  toggle (store, {prop}) { 
    store[prop] = !store[prop];
    this.commit('setVuex');
  },  
  
  appendToFavorite (store, {prop, state}) {
    this._vm.$set(store[prop], state.id, state);
    this.commit('setVuex');
  },
  
  setObj (store, {prop, state}) {
    this._vm.$set(store, prop, state);
    this.commit('setVuex');
  },

  deleteCity (store, id) {
    //delete store.favorites[id]
    this._vm.$delete(store.favorites, id);
    this.commit('setVuex');
  },
}

export default mutations;