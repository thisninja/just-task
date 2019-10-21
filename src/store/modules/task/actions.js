import axios from 'axios';
import {
  BASE_URL
} from '../../../services/constants';
import {
  SAVE_TASKS,
} from './types/mutations-types';
import auth from '../auth/auth';

export default {
  async addNewTask({ dispatch }, task) {
    try {
      await axios.post(`${BASE_URL}tasks`,
        { text: task.text, dueDate: task.dueDate },
        { headers: { 'x-access-token': auth.state.idToken } }
      );

      dispatch('getTasks');
    } catch (e) {
      console.error(e);
    }
  },

  async getTasks({ commit }) {
    try {
      const res = await axios.get(`${BASE_URL}tasks`, {
        headers: { 'x-access-token': auth.state.idToken }
      });

      commit(SAVE_TASKS, res.data.tasks);
    } catch (e) {
      console.error(e);
    }
  },

  async deleteTaskById({ commit, dispatch }, id) {
    try {
      await axios.delete(`${BASE_URL}tasks/${id}`, {
        headers: { 'x-access-token': auth.state.idToken }
      });

      dispatch('getTasks');
    } catch (e) {
      console.error(e);
    }
  },

  async updateTask({ commit, dispatch }, task) {
    try {
      await axios.patch(`${BASE_URL}tasks/${task._id}`, task, {
        headers: { 'x-access-token': auth.state.idToken }
      });

      dispatch('getTasks');
    } catch (e) {
      console.error(e);
    }
  }
};
