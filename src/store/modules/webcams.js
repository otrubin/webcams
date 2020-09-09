import axios from '@/plugins/axios';
import mutations from '@/store/mutations';

function prepareCountries(countries) {
  const sortedCountries = countries.sort((item1, item2) => {
    if (item1.name > item2.name) {
      return 1;
    } if (item1.name < item2.name) {
      return -1;
    }
    return 0;
  });
  return sortedCountries.reduce((acc, country) => {
    acc.push({
      text: `${country.name} (${country.count})`,
      value: country.id,
    });
    return acc;
  }, []);
}
function prepareRegions(regions) {
  const sortedRegions = regions.sort((item1, item2) => {
    if (item1.name > item2.name) {
      return 1;
    } if (item1.name < item2.name) {
      return -1;
    }
    return 0;
  });
  return sortedRegions.reduce((acc, region) => {
    acc.push({
      text: `${region.name} (${region.count})`,
      value: region.id,
    });
    return acc;
  }, []);
}

function prepareWebcams(webcams) {
  const sortedWebcams = webcams.sort((item1, item2) => {
    if (item1.title > item2.title) {
      return 1;
    } if (item1.title < item2.title) {
      return -1;
    }
    return 0;
  });
  return sortedWebcams.reduce((acc, webcam) => {
    acc.push({
      id: webcam.id,
      title: webcam.title,
      status: webcam.status,
      image: webcam.image.daylight.preview,
      player: JSON.parse(JSON.stringify(webcam.player)),

    });
    return acc;
  }, []);
}

const {
  COUNTRIES, REGIONS, WEBCAM_COUNTER, CURRENT_COUNTRY, WEBCAMS, CURRENT_PAGE, CURRENT_REGION,
} = mutations;

const webcamsStore = {
  namespaced: true,
  state: {
    countries: [],
    regions: {},
    webcams: [],
    webcamCounter: 0, // number of webcams found
    currentCountryId: '',
    currentRegionId: '',
    webcamPerPage: 10,
    webcamCurrentPage: 1,
  },
  mutations: {
    [COUNTRIES](state, payload) {
      state.countries = payload;
    },
    [REGIONS](state, payload) {
      state.regions[payload.countryId] = payload.regions;
    },
    [WEBCAMS](state, payload) {
      state.webcams = payload;
    },
    [WEBCAM_COUNTER](state, value) {
      state.webcamCounter = value;
    },
    [CURRENT_COUNTRY](state, value) {
      state.currentCountryId = value;
    },
    [CURRENT_PAGE](state, value) {
      state.webcamCurrentPage = value;
    },
    [CURRENT_REGION](state, value) {
      state.currentRegionId = value;
    },
  },
  getters: {
    getCountryList: ({ countries }) => countries,
    getRegions: ({ regions, currentCountryId }) => regions[currentCountryId],
    getCurrentCountryId: ({ currentCountryId }) => currentCountryId,
    webcams: ({ webcams }) => webcams,
    webcamCounter: ({ webcamCounter }) => webcamCounter,
    webcamPerPage: ({ webcamPerPage }) => webcamPerPage,
    webcamCurrentPage: ({ webcamCurrentPage }) => webcamCurrentPage,
    currentRegionId: ({ currentRegionId }) => currentRegionId,
  },
  actions: {
    initWebcamsStore: {
      root: true,
      handler({ dispatch }) {
        dispatch('fetchCountries');
      },
    },
    async fetchCountries({ commit }) {
      try {
        const response = await axios.get('list/?show=countries');
        commit('COUNTRIES', prepareCountries(response.result.countries));
        commit('WEBCAM_COUNTER', response.result.total);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchRegions({ commit }, countryId) {
      try {
        const response = await axios.get(`list/country=${countryId}?show=regions`);
        commit('REGIONS', {
          countryId,
          regions: prepareRegions(response.result.regions),
        });
        commit('WEBCAM_COUNTER', response.result.total);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchWebcams({ commit, getters }, regionId) {
      try {
        if (regionId) {
          if (regionId !== getters.currentRegionId) {
            commit('CURRENT_PAGE', 1); // при изменении региона сбрасывает текущую страницу
          }
          commit('CURRENT_REGION', regionId);
        }
        const limit = getters.webcamPerPage;
        const offset = getters.webcamPerPage * (getters.webcamCurrentPage - 1);
        const request = `list/region=${getters.currentRegionId}/orderby=popularity/limit=${limit},${offset}?show=webcams:image,player`;
        const response = await axios.get(
          request,
        );
        commit('WEBCAMS', prepareWebcams(response.result.webcams));
        commit('WEBCAM_COUNTER', response.result.total);
      } catch (error) {
        console.log(error);
      }
    },
    async changeCurrentCountry({ commit, dispatch }, countryId) {
      await dispatch('fetchRegions', countryId);
      commit('CURRENT_COUNTRY', countryId);
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit('CURRENT_PAGE', page);
      dispatch('fetchWebcams');
    },
  },
};

export default webcamsStore;
