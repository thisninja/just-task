<template>
  <div class="app__wrapper">
    <md-toolbar v-if="auth" class="md-dense">
      <h3 class="md-title toolbar">Welcome, {{ email }}</h3>
      <md-button class="md-primary" @click="onLogout">
        {{ LOGOUT_TITLE }}
      </md-button>
    </md-toolbar>
    <div class="app__container">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
    </div>
  </div>
</template>

<script>
const LOGOUT_TITLE = 'LOGOUT';

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

.layout__icon {
  width: 58px;
  height: 58px;
}

.layout__link {
  margin-top: 10px;
  color: $material-grey-200;
  &:hover {
    color: $material-grey-200;
  }

  span {
    color: $material-blue-200;
  }
}

.auth-form {
  margin-bottom: 10px;
}

.full-width {
  width: 100%;
}

.slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
}

.slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-30px);
        opacity: 0;
    }
}
</style>
