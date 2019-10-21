import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material'
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Login from '@/components/auth/Login.vue';

const localVue = createLocalVue();

localVue.use(VueMaterial);
localVue.use(VueRouter);
localVue.use(Vuex);

describe('Login.vue', () => {
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
      login: jest.fn(),
    };

    mutations = mutations || {
      authUser: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
      mutations,
    });

    wrapper = shallowMount(Login, {
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

      it('should trigger isValidFormByType with param "login"', () => {
        const mock = jest.fn();
        wrapper.vm.isValidFormByType = mock;
        wrapper.vm.onSubmit();

        expect(mock).toHaveBeenCalledWith('login');
        expect(actions.login).not.toHaveBeenCalled();
      });

      it('should trigger login action if isValidFormByType returned true', () => {
        const mock = jest.fn().mockImplementationOnce(() => true);
        wrapper.vm.isValidFormByType = mock;
        wrapper.vm.onSubmit();

        expect(actions.login).toHaveBeenCalled();
      });
    });
  });
});
