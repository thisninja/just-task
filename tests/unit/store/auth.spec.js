import Vue from 'vue';
import state from '../../../src/store/modules/auth/state';
import getters from '../../../src/store/modules/auth/getters';
import actions from '../../../src/store/modules/auth/actions';
import mutations from '../../../src/store/modules/auth/mutations';
import {
  SET_AUTH_DATA,
  CLEAR_AUTH_DATA,
} from '../../../src/store/modules/auth/types/mutations-types';

import axios from 'axios';

jest.mock('../../../src/store/modules/auth/helpers/helper', () => ({
  __esModule: true,
  authUser: jest.fn(),
}));

import { authUser } from '../../../src/store/modules/auth/helpers/helper';

jest.mock('axios');

import {
  BASE_URL
} from '../../../src/services/constants';

import {
  TOKEN,
  USER_ID,
  EMAIL,
  EMAIL_1,
  PASSWORD,
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

  describe('SET_AUTH_DATA', () => {
    const data = {
      token: TOKEN,
      userId: USER_ID,
      email: EMAIL,
    };

    it('should change state data', () => {
      mutations.SET_AUTH_DATA(state, data);
      expect(state.idToken).toEqual(TOKEN);
      expect(state.userId).toEqual(USER_ID);
      expect(state.email).toEqual(EMAIL);
    });
  });

  describe('CLEAR_AUTH_DATA', () => {
    it('should change state data', () => {
      mutations.CLEAR_AUTH_DATA(state);
      expect(state.idToken).toEqual(null);
      expect(state.userId).toEqual(null);
    });
  });
});

describe('actions', () => {
  let commit;
  let dispatch;
  let data;

  function setMocks() {
    commit = jest.fn();

    axios.get.mockResolvedValue({ data: {} });
    axios.post.mockResolvedValue({ data: {} });
    axios.put.mockResolvedValue({ data: {} });
    axios.delete.mockResolvedValue({ data: {} });
  }

  describe('login', () => {
    data = {
      email: EMAIL,
      password: PASSWORD,
    };

    beforeEach(() => {
      setMocks();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call axios.post with params', async () => {
      const mock = jest.spyOn(axios, 'post');
      await actions.login({ commit, dispatch }, data);
      expect(mock).toHaveBeenCalledWith(
        `${BASE_URL}users/login`,
        {
          ...data
        },
      );
    });

    it('should call authUser and axios.post with params', async () => {
      await actions.login({ commit, dispatch }, data);
      expect(authUser).toHaveBeenCalled();
    });
  });

  describe('signup', () => {
    commit;
    dispatch;
    data = {
      email: EMAIL_1,
      password: PASSWORD,
    };

    beforeEach(() => {
      setMocks();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call axios.post with params', async () => {
      const mock = jest.spyOn(axios, 'post');
      await actions.signup({ commit, dispatch }, data);
      expect(mock).toHaveBeenCalledWith(
        `${BASE_URL}users`,
        {
          ...data
        },
      );
    });

    it('should call authUser with params', async () => {
      await actions.signup({ commit, dispatch }, data);
      expect(authUser).toHaveBeenCalled();
    });

    // validate case when login faild to check whether eventBus has been called
  });

  describe('keepSessionPersistent', () => {
    data = {
      email: EMAIL_1,
      password: PASSWORD,
    };

    beforeEach(() => {
      setMocks();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it(`should return false when !localStorage.getItem('token')`, () => {
      expect(actions.keepSessionPersistent({ commit, dispatch }, data)).toEqual(false);
      expect(localStorage.getItem.mock.calls.length).toBe(1);
      expect(localStorage.getItem.mock.calls[0][0]).toBe('token');
    });

    it(`should return false when localStorage.getItem('token') is set but expirationDate is <= Date.now()`, () => {
      localStorage.setItem('token', TOKEN);
      localStorage.setItem('expirationDate', new Date(Date.now() - 60 * 1000));
      expect(actions.keepSessionPersistent({ commit, dispatch }, data)).toEqual(false);
      expect(localStorage.getItem.mock.calls.length).toBe(2);
      expect(localStorage.getItem.mock.calls[0][0]).toBe('token');
      expect(localStorage.getItem.mock.calls[1][0]).toBe('expirationDate');
    });

    it('should call authUser action otherwise', () => {
      localStorage.setItem('token', TOKEN);
      localStorage.setItem('expirationDate', new Date(Date.now() + 60 * 1000));

      actions.keepSessionPersistent({ commit, dispatch }, data);
      expect(localStorage.getItem.mock.calls.length).toBe(4);
      expect(localStorage.getItem.mock.calls[0][0]).toBe('token');
      expect(localStorage.getItem.mock.calls[1][0]).toBe('expirationDate');
      expect(localStorage.getItem.mock.calls[2][0]).toBe('userId');
      expect(localStorage.getItem.mock.calls[3][0]).toBe('email');
      expect(commit).toHaveBeenCalledWith(SET_AUTH_DATA, {
        email: null,
        userId: null,
        token: TOKEN,
      });
    });
  });

  describe('setLogoutTimer', () => {
    data = {
      email: EMAIL_1,
      password: PASSWORD,
    };

    beforeEach(() => {
      setMocks();
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
      jest.clearAllMocks();
    });

    it(`should return false when !localStorage.getItem('token')`, () => {
      expect(commit).not.toBeCalled();
      actions.setLogoutTimer({ commit }, 1);

      jest.runAllTimers();

      expect(commit).toBeCalled();
      expect(commit).toHaveBeenCalledTimes(1);
    });
  });

  describe('logout', () => {
    beforeEach(() => {
      setMocks();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call authUser and axios.post with params', () => {
      actions.logout({ commit });
      expect(commit).toHaveBeenCalledWith(CLEAR_AUTH_DATA);
      expect(localStorage.removeItem.mock.calls.length).toBe(4);
      expect(localStorage.removeItem.mock.calls[0][0]).toBe('expirationDate');
      expect(localStorage.removeItem.mock.calls[1][0]).toBe('token');
      expect(localStorage.removeItem.mock.calls[2][0]).toBe('userId');
      expect(localStorage.removeItem.mock.calls[3][0]).toBe('email');
    });
  });
});
