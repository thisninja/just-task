import { shallowMount, mount } from '@vue/test-utils';
import { validationMixin } from '@/components/auth/mixins/Validation.js';
import {
  EMAIL_REQUIRED,
  VALID_EMAIL_REQUIRED,
} from '@/components/auth/constants.js';

describe('Validation.js', () => {
  describe('methods', () => {
    const unvalidEmail1 = 'foo';
    const unvalidEmail2 = 'foo@';
    const unvalidEmail3 = 'foo@bar';
    const unvalidEmail4 = 'foo@bar.';
    const validEmail = 'foo@bar.com';
    let wrapper;
    const Component = {
      render() { },
      data() {
        return {
          email: null,
          password: '',
          confirmPassword: '',
        };
      },
      mixins: [validationMixin]
    };

    beforeEach(() => {
      wrapper = shallowMount(
        Component
      );
    });

    describe('getValidationClassByType', () => {
      afterEach(() => {
        wrapper.vm.errors = [];
      });

      it('should return empty string as a class name when no error', () => {
        expect(wrapper.vm.getValidationClassByType('email')).toEqual('');
      });

      it('should return "md-invalid" as class name when there is EMAIL_REQUIRED error', () => {
        wrapper.vm.errors.push(EMAIL_REQUIRED);
        expect(wrapper.vm.getValidationClassByType('email')).toEqual('md-invalid');
      });

      it('should return "md-invalid" as class name when there is VALID_EMAIL_REQUIRED error', () => {
        wrapper.vm.errors.push(VALID_EMAIL_REQUIRED);
        expect(wrapper.vm.getValidationClassByType('email')).toEqual('md-invalid');
      });

    });

    describe('isValidEmail', () => {
      it('should return false for not valid email', () => {
        expect(wrapper.vm.isValidEmail(unvalidEmail1)).toEqual(false);
        expect(wrapper.vm.isValidEmail(unvalidEmail2)).toEqual(false);
        expect(wrapper.vm.isValidEmail(unvalidEmail3)).toEqual(false);
        expect(wrapper.vm.isValidEmail(unvalidEmail4)).toEqual(false);
      });

      it('should return false for not valid email', () => {
        expect(wrapper.vm.isValidEmail(validEmail)).toEqual(true);
      });
    });

    describe('isValidFormByType', () => {
      beforeEach(() => {
        expect(wrapper.vm.errors).toEqual([]);
      });

      it('should return false if no email specified', () => {
        expect(wrapper.vm.isValidFormByType()).toEqual(false);
      });

      it('should return false if no password specified', () => {
        expect(wrapper.vm.isValidFormByType()).toEqual(false);
      });

      it('should return false if password specified is less then 6', () => {
        expect(wrapper.vm.isValidFormByType('signup')).toEqual(false);
      });

      it(`should return false if type === 'signup' and password !== confirmPassword`, () => {
        wrapper.vm.email = validEmail;
        wrapper.vm.password = '123456';
        wrapper.vm.confirmPassword = '1234567';
        expect(wrapper.vm.isValidFormByType('signup')).toEqual(false);
      });

      it(`should return true if email and passwords match for type === 'login'`, () => {
        wrapper.vm.email = validEmail;
        wrapper.vm.password = '123456';
        expect(wrapper.vm.isValidFormByType('login')).toEqual(true);
      });

      it(`should return true if email and passwords match for type === 'signup'`, () => {
        wrapper.vm.email = validEmail;
        wrapper.vm.password = '123456';
        wrapper.vm.confirmPassword = '123456';
        expect(wrapper.vm.isValidFormByType('signup')).toEqual(true);
      });
    });
  });
});
