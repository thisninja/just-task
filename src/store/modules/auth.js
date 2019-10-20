import axios from '../../services/Api';
import router from '../../router/router';
import {
  EMAIL_IN_USE,
  LOGIN_ERROR_MSG_DEFAULT,
  SIGNUP_ERROR_MSG_DEFAULT,
} from '../constants';

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

const mutations = {
  authUser(state, payload) {
    state.idToken = payload.token;
    state.userId = payload.userId;
    state.email = payload.email;
  },
  storeUser(state, payload) {
    state.user = payload;
  },
  clearAuthData(state) {
    state.idToken = null;
    state.userId = null;
  }
};

function authUser(res, { commit, dispatch }) {
  commit('authUser', {
    token: res.headers['x-access-token'],
    userId: res.data._id,
    email: res.data.email
  });

  const now = new Date();
  const expiresIn = parseInt(res.headers['expires-in']);

  const expirationDate = new Date(now.getTime() + expiresIn * 1000);

  localStorage.setItem('token', res.headers['x-access-token']);
  localStorage.setItem('userId', res.data._id);
  localStorage.setItem('email', res.data.email);
  localStorage.setItem('expirationDate', expirationDate);

  dispatch('setLogoutTimer', expiresIn);
}

const actions = {
  async signup({ commit, dispatch }, authData) {
    try {
      const res = await axios.post('/users', {
        email: authData.email,
        password: authData.password
      });

      authUser(res, { commit, dispatch });
      router.push({ name: 'Home' });
    } catch (error) {
      let errorMsg = SIGNUP_ERROR_MSG_DEFAULT;
      const response = error.response;

      if (response && response.data && response.data.code === 11000) {
        errorMsg = EMAIL_IN_USE;
      }
    }
  },
  async login({ commit, dispatch }, authData) {
    try {
      const res = await axios.post('/users/login', {
        email: authData.email,
        password: authData.password
      });

      authUser(res, { commit, dispatch });
      router.push({ name: 'Home' });
    } catch (error) {
      let errorMsg = LOGIN_ERROR_MSG_DEFAULT;
      const response = error.response;

      if (response && typeof response.data === 'string') {
        errorMsg = response.data;
      }
    }
  },
  keepSessionPersistent({ commit }) {
    const token = localStorage.getItem('token')
    if (!token) {
      return false;
    }

    const expirationDate = localStorage.getItem('expirationDate');
    const now = new Date();
    if (now >= expirationDate) {
      return false;
    }

    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('email');
    commit('authUser', {
      token: token,
      userId: userId,
      email: userEmail
    })
  },
  setLogoutTimer({ commit }, expirationTime) {
    setTimeout(() => {
      commit('clearAuthData')
    }, expirationTime * 1000)
  },
  logout({ commit }) {
    try {
      commit('clearAuthData');

      localStorage.removeItem('expirationDate');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');

      router.push({ name: 'Login' });
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
