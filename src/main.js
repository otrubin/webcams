import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/axios';
import './plugins/bootstrap';
import appConfig from './appConfig';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  appConfig,
  render: (h) => h(App),
}).$mount('#app');
