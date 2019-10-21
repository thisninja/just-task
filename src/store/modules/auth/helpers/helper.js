export const authUser = (res, { commit, dispatch }) => {
  commit('SET_AUTH_DATA', {
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
};
