export default { 

  changeProp (store, {prop, state}) {
    console.log(arguments)
    store[prop] = state;
  },

  changeObj (store, {obj, prop, state}) {
    console.log(arguments)
    store[obj][prop] = state;
  },

  toggle (store, {prop}) { 
    store[prop] = !store[prop];
  },

}
 