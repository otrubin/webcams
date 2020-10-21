<template>
  <div class="favorite-list">
    <template v-if="isWebcamListNotEmpty">
      <b-row>
        <b-col md="6" v-for="(webcamData, key) in currentWebcamList" :key="key">
          <Webcam
            :webcamData="webcamData"
            @onShowWebcamPlayer="onShowWebcamPlayer"
            @onAddToFavorite="onAddToFavorite"
          />
        </b-col>
      </b-row>
      <ModalView ref="favoriteModalView" />
      <WebcamTags ref="favoriteWebcamTags" />
    </template>
    <template v-else>
      <h3 class="text-center">Список пуст. Выберите теги</h3>
    </template>
  </div>
</template>

<script>

import Webcam from '@/components/Webcam.vue';
import { mapGetters } from 'vuex';
import ModalView from './ModalView.vue';
import WebcamTags from './WebcamTags.vue';

export default {
  name: 'FavoriteList',
  components: { Webcam, ModalView, WebcamTags },
  data: () => ({
    currentWebcamList: [],
  }),
  computed: {
    ...mapGetters('tags', ['tags', 'webcams', 'selectedTags']),
    isWebcamListNotEmpty() {
      return Boolean(this.currentWebcamList.length);
    },
  },
  methods: {
    onShowWebcamPlayer(webcamData) {
      this.$refs.favoriteModalView.showPlayer(webcamData);
    },
    onAddToFavorite(webcamData) {
      this.$refs.favoriteWebcamTags.handleWebcamTags(webcamData);
    },
  },
  watch: {
    selectedTags() {
      const webcamIds = new Set();
      this.selectedTags.forEach((tagName) => {
        const tag = this.tags.get(tagName);
        if (tag) {
          tag.forEach((webcamId) => {
            webcamIds.add(webcamId);
          });
        }
      });
      const webcamList = [];
      webcamIds.forEach((webcamId) => {
        const webcam = this.webcams[webcamId];
        if (webcam) {
          webcamList.push(webcam);
        }
      });
      this.currentWebcamList = webcamList;
    },
  },
};
</script>
