import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';

import router from './router/router';

import store from './store/store';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
});
