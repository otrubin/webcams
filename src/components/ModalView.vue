<template>
  <b-modal id="modal-view" size="lg" :title="webcamData.title" ok-only ok-title="Закрыть">
    <div class="embed-responsive embed-responsive-16by9">
    <iframe
      class="embed-responsive-item"
      :src="getPlayerUrl"
      allowfullscreen>
    </iframe>
  </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalView',
  data: () => ({
    webcamData: {},
  }),
  computed: {
    getPlayerUrl() {
      const { player } = this.webcamData;
      if (!player) {
        return '';
      }
      const types = ['live', 'day', 'month', 'year', 'lifetime'];
      for (let i = 0; i < types.length; i += 1) {
        const type = types[i];
        if (player[type].available) {
          return player[type].embed;
        }
      }
      return '';
    },
  },
  methods: {
    showPlayer(webcamData) {
      this.webcamData = webcamData;
      this.$bvModal.show('modal-view');
    },
  },
};
</script>
