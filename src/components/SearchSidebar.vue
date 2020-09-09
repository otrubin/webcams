<template>
  <div class="search-sidebar">
    <h3>Выберите страну</h3>
    <b-form-select
      v-model="selectedCountryId"
      :options="countries"
      :select-size="10">
    </b-form-select>
    <h3 class="mt-4">Выберите регион</h3>
    <b-form-select
      v-model="selectedRegionId"
      :options="getRegions"
      :select-size="10">
    </b-form-select>
    <b-button class="mt-3" :disabled="!Boolean(selectedRegionId)"
      variant="primary" @click="emitSearchWebcams">
      Получить камеры
    </b-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SearchSidebar',
  props: {
    countries: {
      type: Array,
      default: () => ({}),
      required: true,
    },
  },
  data: () => ({
    selectedCountryId: '',
    selectedRegionId: '',
  }),
  computed: {
    ...mapGetters('webcams', ['getRegions']),
  },
  methods: {
    ...mapActions('webcams', ['changeCurrentCountry']),
    emitSearchWebcams() {
      this.$emit('onSearchWebcams', this.selectedRegionId);
    },
  },
  watch: {
    selectedCountryId(value) {
      this.changeCurrentCountry(value);
    },
    getRegions() {
      this.selectedRegionId = '';
    },
  },
};
</script>

<style scoped>

</style>
