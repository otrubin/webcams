<template>
  <div class="search-list mt-4">
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
      <WebcamPagination
        :current-page="webcamCurrentPage"
        :per-page="webcamPerPage"
        :total="webcamCounter"
        @changedPage="onChangePage"
      />
    </template>
    <template v-else>
      <h3 class="text-center">Камер пока не найдено</h3>
    </template>
    <ModalView ref="modalView" />
    <WebcamTags ref="webcamTags" />
    <Loader :isShowLoader="isWebcamsLoader" :isFixed="true"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Webcam from './Webcam.vue';
import WebcamPagination from './WebcamPagination.vue';
import ModalView from './ModalView.vue';
import WebcamTags from './WebcamTags.vue';
import Loader from './Loader.vue';

export default {
  name: 'SearchList',
  components: {
    Webcam,
    WebcamPagination,
    ModalView,
    WebcamTags,
    Loader,
  },
  props: {
    webcams: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('webcams', ['webcamCurrentPage', 'webcamPerPage', 'webcamCounter']),
    ...mapGetters('loaders', ['isWebcamsLoader']),
    isSearchExists() {
      return Boolean(this.webcams.length);
    },
  },
  methods: {
    ...mapActions('webcams', ['changeCurrentPage']),
    onShowWebcamPlayer(webcamData) {
      this.$refs.modalView.showPlayer(webcamData);
    },
    onAddToFavorite(webcamData) {
      this.$refs.webcamTags.handleWebcamTags(webcamData);
    },
    onChangePage(page) {
      this.$router.push({ query: { page } });
      this.changeCurrentPage(page);
    },

  },
  created() {
    if (this.$route.query.page) {
      this.$router.push(this.$route.path);
    }
  },
};
</script>

<style scoped>
  .search-list{
    position: relative;
  }
</style>
