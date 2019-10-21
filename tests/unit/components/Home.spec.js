import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/components/Home.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Home.vue', () => {
  let wrapper;
  let store;
  let actions;
  let mutations;
  let getters;

  beforeEach(() => {
    getters = getters || {
      isAuthenticated: () => null,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(Home, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    getters = null;
  });

  describe('snapshots', () => {
    describe('!isAuthenticated', () => {
      it('should match snapshot if !isAuthenticated', () => {
        expect(wrapper.html()).toMatchSnapshot();
      });
    });

    describe('isAuthenticated', () => {
      beforeAll(() => {
        getters = {
          isAuthenticated: () => true
        }
      });

      it('should match snapshot if isAuthenticated true', () => {
        expect(wrapper.html()).toMatchSnapshot();
      });
    });
  });
});
