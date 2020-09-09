<template>
  <div class="webcam">
    <b-img :src="webcamData.image" fluid :alt="webcamData.title"></b-img>
    <h5>{{ webcamData.title }}</h5>
    <div class="btn-wrap d-flex justify-content-between">
      <b-button variant="primary" size="sm"  @click="emitShowWebcamPlayer(webcamData)">
        Просмотреть
      </b-button>
      <b-button variant="success" size="sm" @click="emitAddToFavorite(webcamData)">
        {{ favoriteButtonTitle }}
      </b-button>
    </div>
    <div v-if="hasTags" class="tag-wrap">
      <p class="tagTitle"><b>Теги:</b></p>
      <TagList
          :tagList="tags"
          :autoClose="false"
          variant="success"
        />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TagList from './TagList.vue';

export default {
  name: 'Webcam',
  components: {
    TagList,
  },
  props: {
    webcamData: {
      type: Object,
    },
  },
  // data: () => ({
  //   tags: [],
  // }),
  computed: {
    ...mapGetters('tags', ['webcamFromId', 'webcams']),
    tags() {
      const webcam = this.webcams[this.webcamData.id];
      return webcam ? webcam.tags : [];
    },
    hasTags() {
      return Boolean(this.tags.length);
    },
    favoriteButtonTitle() {
      return this.hasTags ? 'Изменить теги' : 'В избранное';
    },
  },
  methods: {
    emitShowWebcamPlayer() {
      this.$emit('onShowWebcamPlayer', this.webcamData);
    },
    emitAddToFavorite() {
      this.$emit('onAddToFavorite', this.webcamData);
    },
  },
  // created() {
  //   const webcam = this.webcamFromId(this.webcamData.id);
  //   if (webcam) {
  //     this.tags = webcam.tags;
  //   }
  // },
};
</script>

<style scoped>
  .webcam{
    position: relative;
    margin-bottom: 20px;
    background-color: #f2f2f2;
    transition: all 0.3s ease;
    text-align: center;
    max-width: 400px;
  }
  .webcam h5{
    font-weight: bold;
    font-size: 18px;
    padding: 10px;
  }
  .btn-wrap{
    padding: 0 15px 15px;
  }
  .btn:hover{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  .tag-wrap{
    padding: 0 15px 15px;
    text-align: left;
  }
  .tagTitle{
    margin: 0;
    line-height: 1;
  }
</style>
