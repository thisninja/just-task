import Vue from 'vue';
import Vuex from 'vuex';

import task from './modules/task/task';
import auth from './modules/auth/auth';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    task,
    auth
  },
});
