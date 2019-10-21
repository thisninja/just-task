import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import { mount, createLocalVue } from '@vue/test-utils';
import Task from '@/components/tasks/Task.vue';
import dataMock from './__mocks__/dataMock';

const localVue = createLocalVue();

localVue.use(VueMaterial);
localVue.use(Vuex);

describe('Task.vue', () => {
  let wrapper;
  let store;
  let actions;
  let mutations;
  let getters;

  beforeEach(() => {
    getters = getters || {
      tasks: () => [],
    };

    actions = actions || {
      getTasks: jest.fn(),
      deleteTaskById: jest.fn(),
      updateTask: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });

    wrapper = mount(Task, {
      store,
      localVue,
    });
  });
  describe('snapshots', () => {
    it('should match snapshot if !editTaskForm && !newTaskForm', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should match snapshot if editTaskForm || newTaskForm', () => {
      const randomInRangeOfTwo = Math.round(Math.random());
      const rangeValues = ['editTaskForm', 'newTaskForm'];
      wrapper.vm[rangeValues[randomInRangeOfTwo]] = true;

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    describe('toggleNewTaskForm', () => {
      it('should invert newTaskForm value', () => {
        expect(wrapper.vm.newTaskForm).toBeFalsy();
        wrapper.find('.fn-create-new-task').trigger('click');

        expect(wrapper.vm.newTaskForm).toBeTruthy();
      });
    });

    describe('getFormattedDate', () => {
      it('should return formatted date', () => {
        const date = new Date().getTime();
        const formatted = new Date(date).toDateString();
        expect(wrapper.vm.getFormattedDate(date)).toEqual(formatted);
      });
    });

    describe('action handlers', () => {
      beforeAll(() => {
        getters = {
          tasks: () => dataMock.tasks
        };
      });

      describe('onComplete', () => {
        it('should call deleteTaskById action', () => {
          wrapper.find('.fn-complete-task').trigger('click');
          expect(actions.updateTask).toHaveBeenCalled();
        });

        it('should match snapshot', () => {
          expect(wrapper.html()).toMatchSnapshot();
        });
      });

      describe('onEdit', () => {
        it('should call onEdit action', () => {
          wrapper.vm.onEdit = jest.fn();
          wrapper.find('.fn-edit-task').trigger('click');
          expect(wrapper.vm.onEdit).toHaveBeenCalledWith(wrapper.vm.tasks[0]);
        });

        it('should match snapshot', () => {
          expect(wrapper.html()).toMatchSnapshot();
        });
      });

      describe('onDelete', () => {
        it('should match snapshot', () => {
          expect(wrapper.html()).toMatchSnapshot();
        });

        it('should call deleteTaskById action', () => {
          wrapper.find('.fn-delete-task').trigger('click');
          expect(actions.deleteTaskById).toHaveBeenCalled();
        });
      });
    });
  });
});
