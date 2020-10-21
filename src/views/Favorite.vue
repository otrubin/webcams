<template>
  <div class="favorite-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <FavoriteSidebar />
        </div>
        <div class="col-lg-8">
          <FavoriteList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FavoriteSidebar from '@/components/FavoriteSidebar.vue';
import FavoriteList from '@/components/FavoriteList.vue';

export default {
  name: 'Home',
  components: { FavoriteSidebar, FavoriteList },
};
</script>
