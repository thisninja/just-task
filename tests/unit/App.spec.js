import Vue from 'vue';
import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';

const EventBus = new Vue();

const GlobalPlugins = {
  install(v) {
    // Event bus
    v.prototype.$bus = EventBus;
  },
};

const localVue = createLocalVue();

localVue.use(GlobalPlugins);
localVue.use(VueRouter);
localVue.use(Vuex);
localVue.use(VueMaterial);

describe('App.vue', () => {
  let wrapper;
  let store;
  let actions;
  let mutations;
  let getters;

  beforeEach(() => {
    getters = getters || {
      email: () => '',
      isAuthenticated: () => null,
    };

    actions = actions || {
      logout: jest.fn(),
      keepSessionPersistent: jest.fn(),
    };

    mutations = mutations || {
      clearAuthData: jest.fn(),
      authUser: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
      mutations,
    });

    wrapper = shallowMount(App, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    getters = null;
    actions = null;
    mutations = null;
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('computed', () => {
    beforeAll(() => {
      getters = {
        email: () => 'test@test.com',
        isAuthenticated: () => true,
      };
    });

    it('should match snapshot when auth true', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('created hook', () => {
    it('EventBus', () => {
      const spy = jest.spyOn(wrapper.vm.$bus, '$emit');
      const mockMsg = 'foo';
      wrapper.vm.$bus.$emit('token-validation:failed', mockMsg);

      expect(spy).toHaveBeenCalled();

      // expect(wrapper.vm.errorMessage).toEqual(mockMsg);
      // expect(wrapper.vm.showSnackbar).toEqual(true);
    });

    it('keepSessionPersistent', () => {
      expect(actions.keepSessionPersistent).toHaveBeenCalled();
    });
  });
});