import Vuex from 'vuex';
import VueMaterial from 'vue-material';
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import TaskForm from '@/components/tasks/TaskForm.vue';
import dataMock from './__mocks__/dataMock';
import {
  ADD_TASK_TEXT,
  EDIT_TASK_TEXT,
} from '@/components/tasks/constants';

const localVue = createLocalVue();

localVue.use(VueMaterial);
localVue.use(Vuex);

describe('TaskForm.vue', () => {
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
      addNewTask: jest.fn(),
      updateTask: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  describe('Add TaskForm', () => {
    beforeAll(() => {
      wrapper = shallowMount(TaskForm, {
        store,
        localVue,
        propsData: {
          currentText: dataMock.tasks[0].text,
          dueDate: dataMock.tasks[0].dueDate,
        },
      });
    });

    it('should match snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('Edit TaskForm', () => {
    beforeAll(() => {
      wrapper = shallowMount(TaskForm, {
        store,
        localVue,
        propsData: {
          id: dataMock.tasks[1]._id,
          currentText: dataMock.tasks[1].text,
          dueDate: dataMock.tasks[1].dueDate,
        },
      });
    });

    it('should match snapshot', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('computed', () => {
    it('currentTitle', () => {
      expect(wrapper.vm.currentTitle).toEqual(EDIT_TASK_TEXT);
    });

    it('disabled', () => {
      expect(wrapper.vm.disabled).toEqual(false);

      wrapper.vm.text = '';
      wrapper.vm.selectedDate = null;

      expect(wrapper.vm.disabled).toEqual(true);
    });
  });

  describe('methods', () => {
    it('targetHandler', () => {
      wrapper.vm.editTask = jest.fn();
      wrapper.vm.targetHandler();

      expect(wrapper.vm.editTask).toHaveBeenCalled();
    });

    it('addTask', () => {
      wrapper.vm.addTask();
      expect(wrapper.emitted().update).toBeTruthy();
    });

    it('editTask', () => {
      wrapper.vm.editTask();
      expect(wrapper.emitted().update).toBeTruthy();
    });

    it('onCancel', () => {
      wrapper.vm.onCancel();
      expect(wrapper.emitted().update).toBeTruthy();
    });
  });
});
