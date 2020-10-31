<template>
  <div class="loader" v-bind:style="position" v-if="isShowLoader">
    <b-spinner type="grow" variant="ligth" label="Loading..."></b-spinner>
  </div>
</template>

<script>

export default {
  name: 'Loader',
  props: {
    isShowLoader: Boolean,
    isFixed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    position() {
      return this.isFixed ? { position: 'fixed' } : { position: 'absolute' };
    },
  },
};
</script>

<style scoped>
  .loader{
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
