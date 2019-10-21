import {
  BASE_URL
} from '../../../services/constants';
import EventBus from '../../../eventBus';
import axios from 'axios';
import { authUser } from './helpers/helper';
import {
  EMAIL_IN_USE,
  LOGIN_ERROR_MSG_DEFAULT,
  SIGN_UP_ERROR_MSG_DEFAULT,
} from '../../constants';
import {
  SET_AUTH_DATA,
  CLEAR_AUTH_DATA,
} from './types/mutations-types';

export default {
  async signup({ commit, dispatch }, authData) {
    try {
      const res = await axios.post(`${BASE_URL}users`, {
        email: authData.email,
        password: authData.password
      });

      authUser(res, { commit, dispatch });
    } catch (error) {
      let errorMsg = SIGN_UP_ERROR_MSG_DEFAULT;
      const response = error.response;

      if (response && response.data && response.data.code === 11000) {
        errorMsg = EMAIL_IN_USE;
      }

      EventBus.$emit('signup:failed', errorMsg);
    }
  },
  async login({ commit, dispatch }, authData, authFn) {
    try {
      const res = await axios.post(`${BASE_URL}users/login`, {
        email: authData.email,
        password: authData.password
      });

      authUser(res, { commit, dispatch });
    } catch (error) {
      let errorMsg = LOGIN_ERROR_MSG_DEFAULT;
      const response = error.response;

      if (response && typeof response.data === 'string') {
        errorMsg = response.data;
      }

      EventBus.$emit('login:failed', errorMsg);
    }
  },
  keepSessionPersistent({ commit }) {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    const expirationDate = localStorage.getItem('expirationDate');

    const now = new Date().toISOString();

    if (now >= new Date(expirationDate).toISOString()) {
      return false;
    }

    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('email');
    commit(SET_AUTH_DATA, {
      token: token,
      userId: userId,
      email: userEmail
    });
  },
  setLogoutTimer({ commit }, expirationTime) {
    setTimeout(() => {
      commit(CLEAR_AUTH_DATA);
    }, expirationTime * 1000);
  },
  logout({ commit }) {
    try {
      commit(CLEAR_AUTH_DATA);

      localStorage.removeItem('expirationDate');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
    } catch (error) {
      console.error(error);
    }
  },
};
