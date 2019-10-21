import { BASE_URL } from '../../../src/services/constants';
import state from '../../../src/store/modules/task/state';
import getters from '../../../src/store/modules/task/getters';
import actions from '../../../src/store/modules/task/actions';
import mutations from '../../../src/store/modules/task/mutations';
import {
  SAVE_TASKS,
} from '../../../src/store/modules/task/types/mutations-types';

import dataMock from '../components/tasks/__mocks__/dataMock';

import axios from 'axios';

jest.mock('axios');

import {
  TASK_TEXT,
  DUE_DATE,
} from './__mocks__/data';

const originalState = { ...state };

describe('mutations', () => {
  afterEach(() => {
    Object.keys(state).forEach((key) => {
      const formattedKey = `SET_${key
        .split(/(?=[A-Z])/)
        .join('_')
        .toUpperCase()}`;

      if (mutations[formattedKey]) {
        mutations[formattedKey](state, originalState[key]);
      }
    });

    jest.clearAllMocks();
  });

  describe('SAVE_TASKS', () => {
    it('SAVE_TASKS with valid data', () => {
      mutations.SAVE_TASKS(state, dataMock.tasks);
      expect(state.tasks).toEqual(dataMock.tasks);
    });
  });
});

describe('actions', () => {
  let commit;
  let dispatch;
  let data;

  function setMocks() {
    commit = jest.fn();
    dispatch = jest.fn();

    axios.get.mockResolvedValue({
      data: {
        tasks: dataMock.tasks,
      },
    });
    axios.post.mockResolvedValue({ data: {} });
    axios.patch.mockResolvedValue({ data: {} });
    axios.delete.mockResolvedValue({ data: {} });
  }

  describe('addNewTask', () => {
    beforeEach(() => {
      data = {
        text: TASK_TEXT,
        dueDate: DUE_DATE,
      };

      setMocks();
    });

    afterEach(() => {
      data = {};
      jest.clearAllMocks();
    });

    it('should call axios.post with params', async () => {
      const mock = jest.spyOn(axios, 'post');
      await actions.addNewTask({ commit, dispatch }, data);
      expect(mock).toHaveBeenCalledWith(
        `${BASE_URL}tasks`,
        {
          ...data,
        },
        {
          headers: {
            'x-access-token': null,
          }
        }
      );
    });

    it('should call getTasks', async () => {
      await actions.addNewTask({ commit, dispatch }, data);
      expect(dispatch).toHaveBeenCalledWith('getTasks');
    });
  });

  describe('getTasks', () => {
    beforeEach(() => {
      setMocks();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call axios.get with params', async () => {
      const mock = jest.spyOn(axios, 'get');
      await actions.getTasks({ commit });
      expect(mock).toHaveBeenCalledWith(
        `${BASE_URL}tasks`,
        {
          headers: {
            'x-access-token': null,
          }
        }
      );
    });

    it('should call SAVE_TASKS with params', async () => {
      await actions.getTasks({ commit });
      expect(commit).toHaveBeenCalledWith(SAVE_TASKS, [...dataMock.tasks]);
    });
  });

  describe('deleteTaskById', () => {
    beforeEach(() => {
      data = {
        id: dataMock.tasks[0]._id,
      };

      setMocks();
    });

    afterEach(() => {
      data = {};
      jest.clearAllMocks();
    });

    it('should call axios.delete with params', async () => {
      const mock = jest.spyOn(axios, 'delete');
      await actions.deleteTaskById({ commit, dispatch }, data.id);
      expect(mock).toHaveBeenCalledWith(
        `${BASE_URL}tasks/${data.id}`,
        {
          headers: {
            'x-access-token': null,
          }
        }
      );
    });

    it('should call getTasks with params', async () => {
      await actions.deleteTaskById({ commit, dispatch }, data.id);
      expect(dispatch).toHaveBeenCalledWith('getTasks');
    });
  });

  describe('updateTask', () => {
    beforeEach(() => {
      data = dataMock.tasks[1];

      setMocks();
    });

    afterEach(() => {
      data = {};
      jest.clearAllMocks();
    });

    it('should call axios.put with params', async () => {
      const mock = jest.spyOn(axios, 'patch');
      await actions.updateTask({ commit, dispatch }, data);
      expect(mock).toHaveBeenCalledWith(
        `${BASE_URL}tasks/${data._id}`,
        {
          ...data
        },
        {
          headers: {
            'x-access-token': null,
          }
        }
      );
    });

    it('should call getTasks', async () => {
      await actions.updateTask({ commit, dispatch }, data);
      expect(dispatch).toHaveBeenCalledWith('getTasks');
    });
  });
});
