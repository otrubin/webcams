import mutations from '@/store/mutations';
import lodash from 'lodash';

const {
  TAGS_ADD_TAG,
  TAGS_ADD_WEBCAM,
  TAGS_SET_SELECTED_TAGS,
  TAGS_SET_TAGNAME,
  TAGS_DELETE_TAG,
} = mutations;
const tagStore = {
  namespaced: true,
  state: {
    tags: new Map(), // tags: new Map([['прлдо', new Set()], ['фыва', new Set()]]),
    webcams: {},
    selectedTags: [],
  },
  getters: {
    tags: ({ tags }) => tags,
    tagsAsArray: ({ tags }) => Array.from(tags.keys()),
    selectedTags: ({ selectedTags }) => selectedTags,
    webcams: ({ webcams }) => webcams,
    webcamFromId: ({ webcams }) => (webcamId) => webcams[webcamId],
  },
  mutations: {
    [TAGS_ADD_TAG](state, payload) {
      const cloneTags = lodash.cloneDeep(state.tags);// клонируем
      const value = cloneTags.get(payload.tag) || new Set();
      value.add(payload.webcamId);
      cloneTags.set(payload.tag, value);
      state.tags = cloneTags;// присваиваем склонированный map для реактивности
    },
    [TAGS_ADD_WEBCAM](state, webcamObj) {
      state.webcams[webcamObj.id] = webcamObj;
    },
    [TAGS_SET_SELECTED_TAGS](state, selectedTags) {
      state.selectedTags = selectedTags;
    },
    [TAGS_SET_TAGNAME](state, payload) {
      const webcams = state.tags.get(payload.oldName);
      if (!webcams) {
        return;
      }
      const cloneTags = lodash.cloneDeep(state.tags);// клонируем
      cloneTags.delete(payload.oldName);
      cloneTags.set(payload.newName, webcams);
      state.tags = cloneTags;// присваиваем склонированный map для реактивности
      Object.values(state.webcams).forEach((webcam) => { // обновляем имя тега в камерах
        const index = webcam.tags.indexOf(payload.oldName);
        if (index > -1) {
          webcam.tags.splice(index, 1);
          webcam.tags.push(payload.newName);
        }
      });
    },
    [TAGS_DELETE_TAG](state, tagName) {
      const cloneTags = lodash.cloneDeep(state.tags);// клонируем
      cloneTags.delete(tagName);
      state.tags = cloneTags;// присваиваем склонированный map для реактивности
      Object.values(state.webcams).forEach((webcam) => {
        const index = webcam.tags.indexOf(tagName);
        if (index > -1) {
          webcam.tags.splice(index, 1);
          if (!webcam.tags.length) {
            delete state.webcams[webcam.id]; // если у объектов нет тегов, удаляем его из избранного
          }
        }
      });
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
    setSelectedTags({ commit }, selectedTags) {
      commit('TAGS_SET_SELECTED_TAGS', selectedTags);
    },
    renameTag({ commit }, payload) {
      commit('TAGS_SET_TAGNAME', payload);
    },
    deleteTag({ commit }, tagName) {
      commit('TAGS_DELETE_TAG', tagName);
    },
  },
};

export default tagStore;
