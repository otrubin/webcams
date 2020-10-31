<template>
  <div class="search-sidebar">
    <h3>Выберите страну</h3>
    <div class="select-country-wrap">
      <b-form-select
        v-model="selectedCountryId"
        :options="countries"
        :select-size="10">
      </b-form-select>
      <Loader :isShowLoader="isCountriesLoader"/>
    </div>
    <h3 class="mt-4">Выберите регион</h3>
    <div class="select-region-wrap">
      <b-form-select
        v-model="selectedRegionId"
        :options="getRegions"
        :select-size="10">
      </b-form-select>
      <Loader :isShowLoader="isRegionsLoader"/>
    </div>
    <b-button class="mt-3" :disabled="!Boolean(selectedRegionId)"
      variant="primary" @click="emitSearchWebcams">
      Получить камеры
    </b-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Loader from './Loader.vue';

export default {
  name: 'SearchSidebar',
  components: { Loader },
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
    ...mapGetters('loaders', ['isCountriesLoader', 'isRegionsLoader']),
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
  h3{
    font-size: 22px;
  }
  .search-sidebar {
    background-color: #c0f0f6;
    padding: 20px;
  }
  .select-country-wrap, .select-region-wrap {
    position: relative;
  }
</style>
