import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import { apiInstance } from '../../src/utils';

import {
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_LOADING,
  SEND_EMAIL_SUCCESS
} from '../../src/redux/actions/actionTypes';
import { sendUserEmail } from '../../src/redux/actions/authActions';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

const history = { push: jest.fn() };

const rightUserRegData = {
  username: 'akeembalo',
  email: 'akeembalo@gmail.com',
  password: 'jdjjjjd99'
};

const expectedResponseDataReg = {
  message: 'Kindly check your email to verify your account',
  token: jwt.sign(rightUserRegData, 'dkdkkdkkd')
};

describe('User verification action creators test', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('should create SEND_EMAIL_FAILURE action if the api request was not successful', async () => {
    mock.onPost('/verify/email').reply(401, {
      message: 'Access denied, you are not authorized to access this route'
    });

    const expectedActions = [
      { type: SEND_EMAIL_LOADING },
      {
        type: SEND_EMAIL_FAILURE
      }
    ];

    await store.dispatch(sendUserEmail({ history }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create SEND_EMAIL_SUCCESS action if there api request was successful', async () => {
    mock.onPost('/verify/email').reply(201, expectedResponseDataReg);
    const expectedActions = [{ type: SEND_EMAIL_LOADING }, { type: SEND_EMAIL_SUCCESS }];
    await store.dispatch(sendUserEmail({ history }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
