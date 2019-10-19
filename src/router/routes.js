import Login from '../components/auth/Login.vue';
import Home from '../components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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