<template>
  <div class="full-width">
    <common-placeholder :title="LOGIN_CTA_TITLE" />
    <validation-errors
      v-if="errors.length"
      :errors="errors"
    />
    <form
      novalidate
      @submit.prevent="onSubmit"
      class="auth-form"
      >
      <md-field
        :class="getValidationClassByType('email')"
        >
        <label>
          {{ ENTER_EMAIL_TITLE }}
        </label>
        <md-input
          v-model="email"
          required
          >
        </md-input>
      </md-field>
      <md-field
        :class="getValidationClassByType('password')"
        >
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
import ValidationErrors from './ValidationErrors';
import {
  LOGIN_CTA_TITLE,
  ENTER_EMAIL_TITLE,
  ENTER_PASSWORD_TITLE,
  LOGIN_TITLE,
  NO_ACCOUNT_TITLE,
  SIGN_UP_TITLE
} from './constants';
import { validationMixin } from './mixins/Validation';

export default {
  name: 'Login',
  components: {
    CommonPlaceholder,
    ValidationErrors,
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
  mixins: [validationMixin],
  methods: {
    onSubmit (e) {
      if (!this.isValidFormByType('login')) {
        return;
      };

      const formData = {
        email: this.email,
        password: this.password,
      };

      this.$store.dispatch('login', formData);
    },
  },
}
</script>
