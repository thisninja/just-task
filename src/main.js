import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  MdToolbar,
  MdButton,
} from 'vue-material/dist/components'

import App from './App';

import router from './router/router';
import store from './store/store';

[
  VueRouter,
  MdToolbar,
  MdButton,
].forEach(item => Vue.use(item));
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
});
