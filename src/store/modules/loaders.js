import mutations from '@/store/mutations';

const { LOADER_SET_STATE } = mutations;

const loaderStore = {
  namespaced: true,
  state: {
    isCountriesLoader: false,
    isRegionsLoader: false,
    isWebcamsLoader: false,
  },
  getters: {
    isCountriesLoader: ({ isCountriesLoader }) => isCountriesLoader,
    isRegionsLoader: ({ isRegionsLoader }) => isRegionsLoader,
    isWebcamsLoader: ({ isWebcamsLoader }) => isWebcamsLoader,
  },
  mutations: {
    [LOADER_SET_STATE](state, loader) {
      state[loader.name] = loader.value;
    },
  },
  actions: {
    setStateCountriesLoader({ commit }, bool) {
      commit(LOADER_SET_STATE, {
        name: 'isCountriesLoader',
        value: bool,
      });
    },
    setStateRegionsLoader({ commit }, bool) {
      commit(LOADER_SET_STATE, {
        name: 'isRegionsLoader',
        value: bool,
      });
    },
    setStateWebcamsLoader({ commit }, bool) {
      commit(LOADER_SET_STATE, {
        name: 'isWebcamsLoader',
        value: bool,
      });
    },
  },
};

export default loaderStore;
