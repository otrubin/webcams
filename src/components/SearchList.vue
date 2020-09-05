<template>
  <div class="search-list">
    <h2>Результаты поиска</h2>
    <template v-if="isSearchExists">
      <b-row>
        <b-col md="6" v-for="(webcamData, key) in webcams" :key="key">
          <Webcam
            :webcamData="webcamData"
            @onShowWebcamPlayer="onShowWebcamPlayer"
            @onAddToFavorite="onAddToFavorite"
          />
        </b-col>
      </b-row>
    </template>
    <template v-else>
      <h3 class="text-center">Камер пока не найдено</h3>
    </template>
    <ModalView ref="modalView" />
    <WebcamTags ref="webcamTags" />
  </div>
</template>

<script>
import Webcam from './Webcam.vue';
import ModalView from './ModalView.vue';
import WebcamTags from './WebcamTags.vue';

export default {
  name: 'SearchList',
  components: {
    Webcam,
    ModalView,
    WebcamTags,
  },
  props: {
    webcams: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isSearchExists() {
      return Boolean(this.webcams.length);
    },
  },
  methods: {
    onShowWebcamPlayer(webcamData) {
      this.$refs.modalView.showPlayer(webcamData);
    },
    onAddToFavorite(webcamData) {
      this.$refs.webcamTags.handleWebcamTags(webcamData);
    },
  },
};
</script>
