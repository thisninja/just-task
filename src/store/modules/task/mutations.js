import {
  SAVE_TASKS
} from './types/mutations-types';

export default {
  [SAVE_TASKS](state, payload) {
    state.tasks = payload;
  },
};
