import Vue from 'vue';
import Vuex from 'vuex';
import stateToLocalStorage from '@/store/plugins/stateToLocalStorage';
import webcams from './modules/webcams';
import tags from './modules/tags';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    webcams,
    tags,
  },
  plugins: [
    stateToLocalStorage({ watchMutations: ['tags'] }),
  ],
});

store.dispatch('initWebcamsStore');

export default store;
