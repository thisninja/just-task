const Login = () => import(/* webpackChunkName: "login" */'../components/auth/Login.vue');
const Signup = () => import(/* webpackChunkName: "signup" */'../components/auth/Signup.vue');
const Home = () => import(/* webpackChunkName: "home" */'../components/Home.vue');

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
