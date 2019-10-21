import {
  SET_AUTH_DATA,
  CLEAR_AUTH_DATA,
} from './types/mutations-types';

export default {
  [SET_AUTH_DATA](state, payload) {
    state.idToken = payload.token;
    state.userId = payload.userId;
    state.email = payload.email;
  },
  [CLEAR_AUTH_DATA](state) {
    state.idToken = null;
    state.userId = null;
  }
};
