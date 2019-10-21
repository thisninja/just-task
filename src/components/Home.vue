<script>
import { mapGetters } from 'vuex';
import Login from './auth/Login.vue';
import Task from './tasks/Task.vue';

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ]),
  },
  render(h) {
    return h('div', { class: 'full-width' }, [
      this.isAuthenticated ? h(Task) : h(Login)
    ]);
  },
}
</script>
