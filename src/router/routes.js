import Login from '../components/auth/Login.vue';
import Signup from '../components/auth/Signup.vue';
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
    component: Signup
  },
  {
    path: '*',
    redirect: '/'
  },
];

export default routes;
