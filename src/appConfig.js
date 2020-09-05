import Vue from 'vue';

/* Делаем appConfig доступным во всех компонентах */

Vue.mixin({
  beforeCreate() {
    const options = this.$options;
    if (options.appConfig) {
      this.$appConfig = options.appConfig;
    } else if (options.parent && options.parent.$appConfig) {
      this.$appConfig = options.parent.$appConfig;
    }
  },
});

export default {
  tags: {
    VARIANT_DEFAULT: 'default',
    VARIANT_SUCCESS: 'success',
  },
};
