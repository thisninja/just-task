<template>
  <div class="full-width">
    <common-placeholder :title="CREATE_ACCOUNT_TITLE" />
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
        >
        </md-input>
      </md-field>
      <md-field>
        <label>
          {{ CONFIRM_PASSWORD_TITLE }}
        </label>
        <md-input
          v-model="confirmPassword"
          type="password"
        >
        </md-input>
      </md-field>
      <md-button
        type="submit"
        class="md-raised md-primary"
      >
        {{ SIGN_UP_TITLE }}
      </md-button>
    </form>
  </div>
</template>

<script>
import CommonPlaceholder from './CommonPlaceholder';
import {
  CREATE_ACCOUNT_TITLE,
  ENTER_EMAIL_TITLE,
  ENTER_PASSWORD_TITLE,
  CONFIRM_PASSWORD_TITLE,
  SIGN_UP_TITLE,
} from './constants';

export default {
  name: 'Signup',
  components: {
    CommonPlaceholder,
  },
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      CREATE_ACCOUNT_TITLE,
      ENTER_EMAIL_TITLE,
      ENTER_PASSWORD_TITLE,
      CONFIRM_PASSWORD_TITLE,
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
