<template>
  <div class="search-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <SearchSidebar :countries="getCountryList" @onSearchWebcams="onSearchWebcams" />
        </div>
        <div class="col-lg-9">
          <SearchList :webcams="webcams" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchSidebar from '@/components/SearchSidebar.vue';
import SearchList from '@/components/SearchList.vue';

export default {
  name: 'Favorite',
  components: {
    SearchSidebar,
    SearchList,
  },
  data: () => ({

  }),
  computed: {
    ...mapGetters('webcams', ['getCountryList', 'webcams']),
  },
  methods: {
    ...mapActions('webcams', ['fetchWebcams']),
    onSearchWebcams(selectedRegionId) {
      if (this.$route.query.page) {
        this.$router.push(this.$route.path);
      }
      this.fetchWebcams(selectedRegionId);
    },
  },
};
</script>
