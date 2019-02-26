export default {
  appErrorsCommit(obj, {index, prop,state}){// console.log('appErrorsCommit', arguments)
    obj[prop][index] = state;
    obj.globalErrorStatus = obj.appErrors.some(e=>e=='error');
  },

  save_mutator(obj, {prop, state}){ },//example;  
  /* maximize: s => { s.global_state = 1 }*/
  
  setRand(obj, {prop,state}) {
    obj[prop] = state > 0 ? +new Date() : -new Date();
  },
  
  sett(obj, {prop,state}) { obj[prop] = obj[prop] == state ? "": state; },//2 раза незя клик
  /* 
    search_mutator(obj, {prop, state}) { obj[prop] = obj[prop] == state ? "": state; }//2 раза незя клик
    obj[prop].leadNumber = obj[prop].leadNumber == state.leadNumber ? "": state.leadNumber; }//второй клик по той же ячейке - уьирает выделение
  },
  */

  state_mutator(s, {prop, val}) {
    s[prop] = val;
  },

  obj_mutator (s, {obj, prop, val}) {
    //console.error('obj_mutator',arguments)
    s[obj][prop] = val;
  },

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
 