import Vue from 'vue';
import Vuex from 'vuex';
import stateToLocalStorage from '@/store/plugins/stateToLocalStorage';
import webcams from './modules/webcams';
import tags from './modules/tags';
import loaders from './modules/loaders';

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
    loaders,
  },
  plugins: [
    stateToLocalStorage({ watchMutations: ['tags'] }),
  ],
});

store.dispatch('initWebcamsStore');

export default store;
