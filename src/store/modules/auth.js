import axios from '../../services/Api';

const state = {
  idToken: null,
  userId: null,
  email: null,
  user: null
};

const getters = {
  email(state) {
    return state.email
  },
  isAuthenticated(state) {
    return state.idToken !== null;
  },
};

const mutations = {};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};