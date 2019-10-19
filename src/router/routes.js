const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/login',
    name: 'Login',
  },
  {
    path: '/signup',
    name: 'SignUp',
  },
  {
    path: '*',
    redirect: '/'
  },
];

export default routes;
