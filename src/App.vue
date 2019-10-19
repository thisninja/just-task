<template>
  <div class="app__wrapper">
    <md-toolbar v-if="auth" class="md-dense">
      <h3 class="md-title toolbar">Welcome, {{ email }}</h3>
      <md-button class="md-primary" @click="onLogout">
        {{ LOGOUT_TITLE }}
      </md-button>
    </md-toolbar>
    <div class="app__container">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
const LOGOUT_TITLE = 'LOGOUT';

import EventBus from './eventBus';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data () {
    return {
      LOGOUT_TITLE,
    }
  },
  computed: {
    ...mapGetters({
      email: 'email',
      auth: 'isAuthenticated',
    }),
  },
  methods: {
    onLogout() {
      // @TODO
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.app {
  &__wrapper {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    .toolbar.md-title  {
      flex: 1;
      font-size: 14px;
      color: $material-grey-200;
    }
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 500px;
    margin: 100px auto;
    text-align: center;
  }
}

.full-width {
  width: 100%;
}
</style>
