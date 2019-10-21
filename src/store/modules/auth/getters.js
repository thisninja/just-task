export default {
  email: state => state.email,
  isAuthenticated: state => !!state.idToken,
};
