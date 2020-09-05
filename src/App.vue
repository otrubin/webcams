<template>
  <div id="app">
    <TopNavigation />
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation.vue';

export default {
  name: 'App',
  components: {
    TopNavigation,
  },
};
</script>

<style>
#app {

}
</style>
