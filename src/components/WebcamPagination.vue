<template>
  <div class="webcam-pagination">
    <BPagination
      v-model="currentPageModel"
      :total-rows="total"
      :per-page="perPage"
      prev-text="Prev"
      next-text="Next"
    />
  </div>
</template>

<script>
export default {
  name: 'MoviesPagination',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage;
      },
      set(value) {
        this.$emit('changedPage', value);
      },
    },
  },
};
</script>
