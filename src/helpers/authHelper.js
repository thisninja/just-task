import store from '../store/store';
import EventBus from '../eventBus';

export const tokenValidator = async (action) => {
  async function logout() {
    const LOGOUT_REASON_MSG = 'You have been logged out due to:';
    const NO_TOKEN_MSG = 'auth token does not exist';

    await store.dispatch('logout');

    return EventBus.$emit('token-validation:failed', `${LOGOUT_REASON_MSG} ${NO_TOKEN_MSG}`);
  };

  if (~['addNewTask', 'getTasks', 'deleteTaskById', 'updateTask'].indexOf(action.type)) {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
    }

    const expirationDate = localStorage.getItem('expirationDate');
    const now = new Date();
    if (now >= expirationDate) {
      logout();
    }
  }
};
