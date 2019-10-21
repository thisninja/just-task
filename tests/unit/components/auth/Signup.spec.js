import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Signup from '@/components/auth/Signup.vue';

const localVue = createLocalVue();

localVue.use(VueMaterial);
localVue.use(VueRouter);
localVue.use(Vuex);

describe('Signup.vue', () => {
  let wrapper;
  let store;
  let actions;
  let mutations;
  let getters;

  beforeEach(() => {
    getters = getters || {
      isAuthenticated: () => true,
    };

    actions = actions || {
      signup: jest.fn(),
    };

    mutations = mutations || {
      authUser: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
      mutations,
    });

    wrapper = shallowMount(Signup, {
      store,
      localVue,
    });
  });

  describe('snapshots', () => {
    it('should match snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    describe('onSubmit', () => {
      afterEach(() => {
        jest.clearAllMocks();
      });

      it('should trigger onSubmit', () => {
        const mock = jest.fn();
        wrapper.vm.onSubmit = mock;
        wrapper.find(".auth-form").trigger("submit.prevent")

        expect(mock).toHaveBeenCalled();
      });

      it('should trigger isValidFormByType with param "signup"', () => {
        const mock = jest.fn();
        wrapper.vm.isValidFormByType = mock;
        wrapper.vm.onSubmit();

        expect(mock).toHaveBeenCalledWith('signup');
        expect(actions.signup).not.toHaveBeenCalled();
      });

      it('should trigger signup action if isValidFormByType returned true', () => {
        const mock = jest.fn().mockImplementationOnce(() => true);
        wrapper.vm.isValidFormByType = mock;
        wrapper.vm.onSubmit();

        expect(actions.signup).toHaveBeenCalled();
      });
    });
  });
});
