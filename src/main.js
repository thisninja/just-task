import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  MdDatepicker,
  MdDialog,
  MdToolbar,
  MdButton,
  MdCard,
  MdField,
} from 'vue-material/dist/components'

import App from './App';

import router from './router/router';
import store from './store/store';

[
  VueRouter,
  MdDatepicker,
  MdDialog,
  MdToolbar,
  MdButton,
  MdCard,
  MdField,
].forEach(item => Vue.use(item));
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
});
