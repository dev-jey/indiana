import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import thunk from 'redux-thunk';
import { toast } from 'react-toastify';

import configureMockStore from 'redux-mock-store';

import { apiInstance, sendHttpRequest } from '../../src/utils';

import {
  GET_USER_STATS_ERROR,
  GET_USER_STATS_SUCCESS,
  GET_USER_STATS_REQUEST
} from '../../src/redux/actions/actionTypes';
import getUserStat from '../../src/redux/actions/getUsersStatActions';

jest.mock('react-toastify');

jest.mock('../../src/utils');

const initialState = {
  user: {
    userData: {
      email: 'ezenwaogbonna1@gmail.com',
      username: 'dondon',
      name: 'in',
      role: 'user',
      isVerified: true,
      id: 'f0b66010-3f11-47f7-86e4-077aaeaf5891',
      exp: 1553273502
    }
  }
};
const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore(initialState);

describe('get user statistics actions for the user', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('should successfully fetch the user"s statistics', async () => {
    sendHttpRequest.mockResolvedValue({
      message: { statistics: {} }
    });
    const expectedActions = [
      { type: GET_USER_STATS_REQUEST },
      { type: GET_USER_STATS_SUCCESS, payload: [{}] }
    ];

    await store.dispatch(getUserStat());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail to get a user"s statistics', async () => {
    sendHttpRequest.mockRejectedValue();
    const expectedActions = [
      { type: GET_USER_STATS_REQUEST },
      {
        type: GET_USER_STATS_ERROR,
        payload: 'There was an error fetching your statistics'
      }
    ];

    await store.dispatch(getUserStat());
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.error).toHaveBeenCalledWith(
      <div>There was an error fetching your statistics</div>
    );
  });
});
