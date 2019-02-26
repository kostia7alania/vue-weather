import axios from 'axios';

export default {

  // => запросы к серверу :: =>
  /*search({state,dispatch,commit}, query ) {//state-из раздела state; 
    dispatch('search', 'text search'); //запуск экшнов асинхронно;
    commit('delete', 'my text')//мутация - измение данных в state;
    commit('change', 'my text '); commit('set', 'my text')
  }*/

  search({commit, state}, data) {
    commit('state_mutator', {prop: 'items', val: []});
  }
}