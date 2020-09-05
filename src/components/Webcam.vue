<template>
  <div class="webcam">
    <b-img :src="webcamData.image" fluid :alt="webcamData.title"></b-img>
    <h5>{{ webcamData.title }}</h5>
    <div class="btn-wrap d-flex justify-content-between">
      <b-button variant="primary" size="sm"  @click="emitShowWebcamPlayer(webcamData)">
        Просмотреть
      </b-button>
      <b-button variant="success" size="sm" @click="emitAddToFavorite(webcamData)">
        В избранное
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Webcam',
  props: {
    webcamData: {
      type: Object,
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
};
</script>

<style scoped>
  .webcam{
    position: relative;
    margin-bottom: 20px;
    background-color: #f2f2f2;
    text-align: center;
    transition: all 0.3s ease;
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
</style>
