import axios from '../../services/Api';
import auth from './auth';

const state = {
  tasks: [],
};

const getters = {
  tasks: state => state.tasks,
};

const mutations = {
  saveTasks(state, payload) {
    state.tasks = payload;
  },
};

const actions = {
  async addNewTask({ dispatch }, task) {
    try {
      await axios.post('/tasks',
        { text: task.text, dueDate: task.dueDate },
        { headers: { 'x-access-token': auth.state.idToken } }
      );

      dispatch('getTasks');
    } catch(e) {
      console.error(e);
    }
  },

  async getTasks({ commit }) {
    try {
      const res = await axios.get('/tasks', {
        headers: { 'x-access-token': auth.state.idToken }
      });

      commit('saveTasks', res.data.tasks);
    } catch (e) {
      console.error(e);
    }
  },

  async deleteTaskById({ commit, dispatch }, id) {
    try {
      await axios.delete(`/tasks/${id}`, {
        headers: { 'x-access-token': auth.state.idToken }
      });

      dispatch('getTasks');
    } catch (e) {
      console.error(e);
    }
  },

  async updateTask({ commit, dispatch }, task) {
    try {
      await axios.patch('/tasks/' + task._id, task, {
        headers: { 'x-access-token': auth.state.idToken }
      });

      dispatch('getTasks');
    } catch (e) {
      console.error(e);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
