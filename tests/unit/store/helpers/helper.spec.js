import { authUser } from '../../../../src/store/modules/auth/helpers/helper';
import {
  EMAIL,
  TOKEN,
  USER_ID,
} from '../__mocks__/data';

describe('authUser', () => {
  const commit = jest.fn();
  const dispatch = jest.fn();
  const res = {
    headers: {
      'x-access-token': TOKEN,
      'expires-in': 1,
    },
    data: {
      _id: USER_ID,
      email: EMAIL,
    }
  };

  it('should call commit, localStorage.setItem and dispatch with the right params', () => {
    authUser(res, { commit, dispatch });

    expect(commit).toHaveBeenCalledWith('SET_AUTH_DATA', {
      token: TOKEN,
      userId: USER_ID,
      email: EMAIL,
    });

    expect(localStorage.setItem.mock.calls.length).toBe(4);
    expect(localStorage.setItem.mock.calls[0][0]).toBe('token');
    expect(localStorage.setItem.mock.calls[1][0]).toBe('userId');
    expect(localStorage.setItem.mock.calls[2][0]).toBe('email');
    expect(localStorage.setItem.mock.calls[3][0]).toBe('expirationDate');

    expect(dispatch).toHaveBeenCalledWith('setLogoutTimer', 1);
  });
});

