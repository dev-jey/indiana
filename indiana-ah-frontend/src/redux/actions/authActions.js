import React from 'react';
import { toast } from 'react-toastify';
import {
  REGISTER_WITH_EMAIL_REQUEST,
  REGISTER_WITH_EMAIL_FAILURE,
  REGISTER_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_EMAIL_SUCCESS,
  VERIFY_USER_REQUEST,
  VERIFY_USER_FAILURE,
  VERIFY_USER_SUCCESS,
  NETWORK_FAILURE,
  SET_CURRENT_USER,
  SIGN_OUT_USER,
  REGISTER_WITH_SM,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_LOADING,
  SEND_EMAIL_SUCCESS,
  SEND_RESET_LINK_LOADING,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_FAILURE,
  UPDATE_PASSWORD_LOADING,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS
} from './actionTypes';
import { sendHttpRequest, validateToken } from '../../utils/index';

export const registerWithEmail = (data, { closeModal, history }) => async (dispatch) => {
  dispatch({ type: REGISTER_WITH_EMAIL_REQUEST });
  try {
    const { message, token } = await sendHttpRequest('/register', 'POST', data);
    localStorage.setItem('token', token);
    const user = validateToken(token);
    dispatch({ type: REGISTER_WITH_EMAIL_SUCCESS });
    dispatch({ type: SET_CURRENT_USER, user });
    closeModal();
    history.push('/');
    toast.success(<div>{message}</div>);
  } catch ({ response }) {
    if (!response) {
      dispatch({ type: NETWORK_FAILURE, payload: 'Connection error.' });
      toast.error(<div>Network Error. Check your connection</div>);
      return;
    }

    dispatch({
      type: REGISTER_WITH_EMAIL_FAILURE,
      payload: response.data.message
    });
  }
};

export const loginWithEmail = (data, { closeModal }) => async (dispatch) => {
  dispatch({ type: LOGIN_WITH_EMAIL_REQUEST });
  try {
    const { message, token } = await sendHttpRequest('/login', 'POST', data);
    localStorage.clear();
    localStorage.setItem('token', token);
    const user = validateToken(token);
    dispatch({ type: SET_CURRENT_USER, user });
    dispatch({ type: LOGIN_WITH_EMAIL_SUCCESS });
    closeModal();
    toast.success(<div>{message}</div>);
  } catch ({ response }) {
    dispatch({
      type: LOGIN_WITH_EMAIL_FAILURE,
      payload: response.data.message
    });
  }
};

export const verifyUser = (query, { history }) => async (dispatch) => {
  dispatch({ type: VERIFY_USER_REQUEST });
  try {
    const { token } = await sendHttpRequest(`/users/verify?query=${query}`, 'PATCH');
    localStorage.setItem('token', token);
    dispatch({ type: VERIFY_USER_SUCCESS });
    toast.success(<div>Email verification successful</div>);
    history.push('/');
  } catch ({ response }) {
    if (!response) {
      dispatch({ type: NETWORK_FAILURE, payload: 'Connection error.' });
      toast.error(<div>Network Error. Check your connection</div>);
      history.push('/');
      return;
    }

    dispatch({ type: VERIFY_USER_FAILURE, payload: response.data.message });
    toast.error(<div>Email verification failed</div>);
    history.push('/');
  }
};

export const signOutUser = () => (dispatch) => {
  window.localStorage.clear();
  dispatch({ type: SIGN_OUT_USER });
};

export const loginWithSocialMedia = token => (dispatch) => {
  const user = validateToken(token);
  if (user) {
    localStorage.setItem('token', token);
    dispatch({ type: SET_CURRENT_USER, user });
    dispatch({ type: REGISTER_WITH_SM });
  } else {
    toast.error(<div>We cannot log you in by this time. Please try again later.</div>);
  }
};

export const sendUserEmail = ({ history }) => async (dispatch) => {
  dispatch({ type: SEND_EMAIL_LOADING });
  try {
    const { message, token } = await sendHttpRequest('/verify/email', 'POST');
    localStorage.setItem('token', token);
    dispatch({ type: SEND_EMAIL_SUCCESS });
    toast.success(<div>{message}</div>);
    history.push('/');
  } catch (res) {
    dispatch({ type: SEND_EMAIL_FAILURE });
  }
};

export const sendResetLink = (data, { closeModal }) => async (dispatch) => {
  dispatch({ type: SEND_RESET_LINK_LOADING });
  try {
    const { message } = await sendHttpRequest('/users/begin-password-reset',
      'POST', data);
    localStorage.clear();
    dispatch({ type: SEND_RESET_LINK_SUCCESS, payload: 'Success' });
    toast.success(<div>{message}</div>);
    closeModal();
  } catch ({ response }) {
    dispatch({ type: SEND_RESET_LINK_FAILURE, payload: response.data.message });
    toast.error(<div>{response.data.message}</div>);
  }
};

export const resetPassword = (data, token, { history }) => async (dispatch) => {
  dispatch({ type: UPDATE_PASSWORD_LOADING });
  try {
    const { message } = await sendHttpRequest(`/users/reset-password?query=${token}`,
      'PATCH', data);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: 'Success' });
    toast.success(<div>{message}</div>);
    history.push('/');
  } catch ({ response }) {
    dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: response.data.message });
    toast.error(<div>{response.data.message}</div>);
  }
};
