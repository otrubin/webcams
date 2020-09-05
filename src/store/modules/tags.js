// import SortedSet from '@/helpers/SortedSet';
import mutations from '@/store/mutations';
// import serialize from 'serialize-javascript';

const { TAGS_ADD_TAG, TAGS_ADD_WEBCAM } = mutations;
const tagStore = {
  namespaced: true,
  state: {
    // tags: new Map([['нет тегов', new Set()], ['фыва', new Set()], ['вапрго', new Set()]]),
    tags: new Map(),
    webcams: {},
  },
  getters: {
    tags: ({ tags }) => tags,
    tagsAsArray: ({ tags }) => Array.from(tags.keys()),
    webcams: ({ webcams }) => webcams,
  },
  mutations: {
    [TAGS_ADD_TAG](state, payload) {
      const value = state.tags.get(payload.tag) || new Set();
      value.add(payload.webcamId);
      state.tags.set(payload.tag, value);
    },
    [TAGS_ADD_WEBCAM](state, webcamObj) {
      state.webcams[webcamObj.id] = webcamObj;
    },
  },
  actions: {
    addTags({ commit }, webcamObj) {
      webcamObj.tags.forEach((tag) => {
        commit('TAGS_ADD_TAG', {
          tag,
          webcamId: webcamObj.id,
        });
      });
    },
    addWebcam({ dispatch, commit }, webcamObj) {
      if (!webcamObj.tags.length) {
        throw new Error('Чтобы добавить камеру в избранное, назначьте ей минимум один тег');
      }
      dispatch('addTags', webcamObj);
      commit('TAGS_ADD_WEBCAM', webcamObj);
    },
  },
};

export default tagStore;
