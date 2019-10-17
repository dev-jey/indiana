import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import jwt from 'jsonwebtoken';
import { apiInstance } from '../../src/utils';

import {
  VERIFY_USER_REQUEST,
  VERIFY_USER_FAILURE,
  VERIFY_USER_SUCCESS,
  NETWORK_FAILURE,
  REGISTER_WITH_EMAIL_FAILURE,
  REGISTER_WITH_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_EMAIL_SUCCESS,
  SET_CURRENT_USER,
  SIGN_OUT_USER,
  SEND_RESET_LINK_LOADING,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_FAILURE,
  UPDATE_PASSWORD_LOADING,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS
} from '../../src/redux/actions/actionTypes';
import {
  verifyUser,
  registerWithEmail,
  loginWithEmail,
  signOutUser,
  sendResetLink,
  resetPassword
} from '../../src/redux/actions/authActions';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

const badUserRegData = {
  username: '334',
  email: 'ozone4life@gmail.com',
  password: 'jjd'
};

const rightUserRegData = {
  username: 'akeembalo',
  email: 'akeembalo@gmail.com',
  password: 'jdjjjjd99'
};

const badUserLoginData = {
  email: 'ozone4life@gmail.com',
  password: 'jjd'
};

const rightUserLoginData = {
  email: 'akeembalo@gmail.com',
  password: 'jdjjjjd99'
};
const expectedLoginResponseDataReg = {
  message: 'successfully logged in',
  token: jwt.sign(rightUserLoginData, 'ejrjrroor', { expiresIn: '24hrs' })
};
const expectedResetLinkResponseData = {
  message: 'password reset link sent to tikucim@yahoo.com',
  token: jwt.sign(rightUserLoginData, 'ejrjrroor', { expiresIn: '24hrs' })
};

const expectedResponseDataReg = {
  message: `Successfully registered to Authors haven.
     Kindly check your email to verify your account`,
  token: jwt.sign(rightUserRegData, 'dkdkkdkkd')
};

const expectedResetReseponse = {
  message: 'Password reset successfully',
  updatedUser: {
    name: null,
    password: 'cB23000gh'
  }
};

const { token } = expectedResponseDataReg;

const history = { push: jest.fn() };
const closeModal = jest.fn();

describe('Auth action creators test', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('should create the REGISTER_WITH_EMAIL_FAILURE action if the api request was not successful', async () => {
    mock.onPost('/register').reply(400, { message: 'Invalid registeration data' });

    const expectedActions = [
      { type: REGISTER_WITH_EMAIL_REQUEST },
      { type: REGISTER_WITH_EMAIL_FAILURE, payload: 'Invalid registeration data' }
    ];

    await store.dispatch(registerWithEmail(badUserRegData, { closeModal, history }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create NETWORK_FAILURE action if there was a network error', async () => {
    mock.onPost('/register').timeout(0);

    const expectedActions = [
      { type: REGISTER_WITH_EMAIL_REQUEST },
      { type: NETWORK_FAILURE, payload: 'Connection error.' }
    ];
    await store.dispatch(registerWithEmail(badUserRegData, { closeModal, history }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the REGISTER_WITH_EMAIL_SUCCESS action if the api request was successful', async () => {
    mock.onPost('/register').reply(201, expectedResponseDataReg);

    const expectedActions = [
      { type: REGISTER_WITH_EMAIL_REQUEST },
      { type: REGISTER_WITH_EMAIL_SUCCESS },
      { type: SET_CURRENT_USER, user: false }
    ];

    await store.dispatch(registerWithEmail(rightUserRegData, { closeModal, history }));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create the LOGIN_WITH_EMAIL_FAILURE action if the api request was not successful', async () => {
    mock.onPost('/login').reply(401, { message: 'error logging in' });

    const expectedActions = [
      { type: LOGIN_WITH_EMAIL_REQUEST },
      { type: LOGIN_WITH_EMAIL_FAILURE, payload: 'error logging in' }
    ];

    await store.dispatch(loginWithEmail(badUserLoginData, { closeModal }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the SEND_RESET_LINK_SUCCESS action if the api request was successful', async () => {
    mock.onPost('/users/begin-password-reset').reply(200, expectedResetLinkResponseData);

    const expectedActions = [
      { type: SEND_RESET_LINK_LOADING },
      { type: SEND_RESET_LINK_SUCCESS, payload: 'Success' }
    ];

    await store.dispatch(sendResetLink({ email: 'tikucim@yahoo.com' }, { closeModal }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the SEND_RESET_LINK_FAILURE action if the api request was not successful', async () => {
    mock.onPost('/users/begin-password-reset').reply(404, {
      message: 'This email is not registered in our system'
    });

    const expectedActions = [
      { type: SEND_RESET_LINK_LOADING },
      {
        type: SEND_RESET_LINK_FAILURE,
        payload: 'This email is not registered in our system'
      }
    ];

    await store.dispatch(sendResetLink({ email: 'tikuokoye@yahoo.com' }, { closeModal }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the UPDATE_PASSWORD_SUCCESS action if the api request was successful', async () => {
    mock.onPatch(`/users/reset-password?query=${token}`).reply(200, expectedResetReseponse);

    const expectedActions = [
      { type: UPDATE_PASSWORD_LOADING },
      { type: UPDATE_PASSWORD_SUCCESS, payload: 'Success' }
    ];

    await store.dispatch(resetPassword({ password: 'cim23000' }, token, { history }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the UPDATE_PASSWORD_FAILURE action if the api request was not successful', async () => {
    mock.onPatch(`/users/reset-password?query=${token}`).reply(401, {
      message: 'This link is invalid or expired!!'
    });

    const expectedActions = [
      { type: UPDATE_PASSWORD_LOADING },
      { type: UPDATE_PASSWORD_FAILURE, payload: 'This link is invalid or expired!!' }
    ];

    await store.dispatch(resetPassword({ password: 'cim23000' }, token, { history }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the LOGIN_WITH_EMAIL_SUCCESS action if the api request was successful', async () => {
    mock.onPost('/login').reply(200, expectedLoginResponseDataReg);

    const expectedActions = [
      { type: LOGIN_WITH_EMAIL_REQUEST },
      { type: SET_CURRENT_USER, user: rightUserLoginData },
      { type: LOGIN_WITH_EMAIL_SUCCESS }
    ];

    await store.dispatch(loginWithEmail(rightUserLoginData, { closeModal }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create VERIFY_USER_FAILURE action if the api request was not successful', async () => {
    mock.onPatch(`/users/verify?query=${token}`).reply(401, {
      message: 'Access denied, you are not authorized to access this route'
    });

    const expectedActions = [
      { type: VERIFY_USER_REQUEST },
      {
        type: VERIFY_USER_FAILURE,
        payload: 'Access denied, you are not authorized to access this route'
      }
    ];

    await store.dispatch(verifyUser(token, { history }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create VERIFY_USER_FAILURE action if there was a network error', async () => {
    mock.onPatch(`/users/verify?query=${token}`).timeout(0);

    const expectedActions = [
      { type: VERIFY_USER_REQUEST },
      { type: NETWORK_FAILURE, payload: 'Connection error.' }
    ];
    await store.dispatch(verifyUser(token, { history }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create VERIFY_USER_SUCCESS action if the api request was successful', async () => {
    mock.onPatch(`/users/verify?query=${token}`).reply(200, expectedResponseDataReg);

    const expectedActions = [
      { type: VERIFY_USER_REQUEST },
      { type: VERIFY_USER_SUCCESS }
    ];

    await store.dispatch(verifyUser(token, { history }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the SIGN_OUT_USER action when the user signs out', () => {
    const expectedActions = [{ type: SIGN_OUT_USER }];
    store.dispatch(signOutUser());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
