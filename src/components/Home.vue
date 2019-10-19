<script>
import Login from './auth/Login.vue';
import Task from './tasks/Task.vue';

export default {
  name: 'Home',
  render(h) {
    return h('div', { class: 'full-width' }, [
      this.$store.getters.isAuthenticated ? h(Task) : h(Login)
    ]);
  },
}
</script>
