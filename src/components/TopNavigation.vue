<template>
  <div class="top-navigation">
    <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand tag="h1" class="mb-0">Webcams</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav align="center" class="mx-auto">
        <b-nav-item to="/">Коллекции</b-nav-item>
        <b-nav-item to="/search">Поиск камер</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  </div>
</template>

<script>
export default {
  name: 'TopNavigation',
};
</script>

<style scoped>
  .router-link-exact-active{
    color: #fff !important;
  }

</style>
