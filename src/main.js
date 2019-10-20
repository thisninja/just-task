import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  MdDatepicker,
  MdDialog,
  MdToolbar,
  MdButton,
  MdCard,
  MdField,
  MdSnackbar,
} from 'vue-material/dist/components'

import App from './App';

import router from './router/router';
import store from './store/store';

import { tokenValidator } from './helpers/authHelper';
store.subscribeAction(tokenValidator);

[
  VueRouter,
  MdDatepicker,
  MdDialog,
  MdToolbar,
  MdButton,
  MdCard,
  MdField,
  MdSnackbar,
].forEach(item => Vue.use(item));
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

router.beforeEach((to, from, next) => {
  store.dispatch('keepSessionPersistent');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    !store.getters.isAuthenticated
      ? next({ name: 'Login' })
      : next();
  } else {
    store.getters.isAuthenticated
      ? next({ name: 'Home' })
      : next();
  }
});

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
});
