import {
  PASSWORD_REQUIRED,
  EMAIL_REQUIRED,
  VALID_EMAIL_REQUIRED,
  PASSWORDS_MISMATCH,
  EMAIL_RE,
  PASSWORD_MIN_LENGTH_TITLE,
  PASSWORD_MIN_LENGTH,
} from '../constants';

export const validationMixin = {
  data() {
    return {
      errors: [],
    }
  },
  methods: {
    getValidationClassByType(type) {
      let validationClass;
      switch (type) {
        case 'email':
          validationClass = ~(this.errors.indexOf(EMAIL_REQUIRED)) || ~(this.errors.indexOf(VALID_EMAIL_REQUIRED))
            ? 'md-invalid'
            : '';
          break;
        case 'password':
          validationClass = ~(this.errors.indexOf(PASSWORD_REQUIRED)) || ~(this.errors.indexOf(PASSWORDS_MISMATCH))
            ? 'md-invalid'
            : '';
          break;
        default:
          validationClass = '';
          break;
      }

      return validationClass;
    },
    isValidEmail(email) {
      return EMAIL_RE.test(email);
    },
    isValidFormByType(type = 'login') {
      let isValid = true;
      this.errors = [];

      if (!this.email) {
        this.errors.push(EMAIL_REQUIRED);
      } else if (!this.isValidEmail(this.email)) {
        this.errors.push(VALID_EMAIL_REQUIRED);
      }

      if (!this.password) {
        this.errors.push(PASSWORD_REQUIRED);
      }

      if (this.password.length && (this.password.length < PASSWORD_MIN_LENGTH)) {
        this.errors.push(PASSWORD_MIN_LENGTH_TITLE);
      }

      if (type === 'signup' && this.password !== this.confirmPassword) {
        this.errors.push(PASSWORDS_MISMATCH);
      }

      if (this.errors.length) {
        isValid = false;
      }

      return isValid;
    },
  }
};
