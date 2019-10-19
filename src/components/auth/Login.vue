<template>
  <div class="full-width">
    <common-placeholder :title="LOGIN_CTA_TITLE" />
    <form
      novalidate
      @submit.prevent="onSubmit"
      class="auth-form"
      >
      <md-field>
        <label>
          {{ ENTER_EMAIL_TITLE }}
        </label>
        <md-input
          v-model="email"
          required
          >
        </md-input>
      </md-field>
      <md-field>
        <label>
          {{ ENTER_PASSWORD_TITLE }}
        </label>
        <md-input
          v-model="password"
          type="password"
          required
          >
        </md-input>
      </md-field>
      <md-button
        type="submit"
        class="md-raised md-primary"
        >
        {{ LOGIN_TITLE }}
      </md-button>
    </form>
    <router-link
      to="/signup"
      class="layout__link"
      >
      {{ NO_ACCOUNT_TITLE }}&nbsp;
      <span>
        {{ SIGN_UP_TITLE }}
      </span>
    </router-link>
  </div>
</template>

<script>
import CommonPlaceholder from './CommonPlaceholder';
import {
  LOGIN_CTA_TITLE,
  ENTER_EMAIL_TITLE,
  ENTER_PASSWORD_TITLE,
  LOGIN_TITLE,
  NO_ACCOUNT_TITLE,
  SIGN_UP_TITLE
} from './constants';

export default {
  name: 'Login',
  components: {
    CommonPlaceholder,
  },
  data () {
    return {
      email: '',
      password: '',
      LOGIN_CTA_TITLE,
      ENTER_EMAIL_TITLE,
      ENTER_PASSWORD_TITLE,
      LOGIN_TITLE,
      NO_ACCOUNT_TITLE,
      SIGN_UP_TITLE,
    }
  },
  methods: {
    onSubmit() {
      // @TODO
    }
  },
}
</script>
