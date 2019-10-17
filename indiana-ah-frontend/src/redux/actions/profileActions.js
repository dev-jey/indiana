import React from 'react';
import { toast } from 'react-toastify';
import {
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_IN_APP_NOTIFICATION_SUCCESS,
  UPDATE_IN_APP_NOTIFICATION_ERROR,
  UPDATE_IN_APP_NOTIFICATION_REQUEST,
  UPDATE_EMAIL_NOTIFICATION_SUCCESS,
  UPDATE_EMAIL_NOTIFICATION_ERROR,
  UPDATE_EMAIL_NOTIFICATION_REQUEST,
  UPDATE_PROFILE_PIC_SUCCESS,
  UPDATE_PROFILE_PIC_ERROR,
  UPDATE_PROFILE_PIC_REQUEST
} from './actionTypes';
import { sendHttpRequest } from '../../utils/index';

const subscribedToInApp = 'You have successfully subscribed to in app notifications';
const subscribedToEmail = 'You have successfully subscribed to our email notifications';

export const getUserProfile = () => async (dispatch, getState) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  const {
    user: {
      userData: { username }
    }
  } = getState();
  try {
    const { profile } = await sendHttpRequest(`/profiles/${username}`, 'GET');
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: profile });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_ERROR,
      payload: 'There was an error fetching your profile'
    });
    toast.error(<div>There was an error fetching your profile</div>);
  }
};
export const updateUserProfile = data => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
  const {
    user: {
      userData: { username }
    }
  } = getState();
  try {
    const { profile } = await sendHttpRequest(
      `/profiles/${username}/update`,
      'PATCH',
      data
    );
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: profile });
    toast.success(<div>updated profile successfully</div>);
  } catch ({
    response: {
      data: { message }
    }
  }) {
    dispatch({
      type: UPDATE_USER_PROFILE_ERROR,
      payload: message
    });
    toast.error(<div>There was an error updating your profile</div>);
  }
};

export const updatePassword = data => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_PASSWORD_REQUEST });
  const {
    user: {
      userData: { username }
    }
  } = getState();
  try {
    await sendHttpRequest(`/profiles/${username}/password`, 'PATCH', data);
    dispatch({ type: UPDATE_USER_PASSWORD_SUCCESS });
    toast.success(<div>updated password successfully</div>);
  } catch ({
    response: {
      data: { message }
    }
  }) {
    dispatch({
      type: UPDATE_USER_PASSWORD_ERROR,
      payload: message
    });
    toast.error(<div>There was an error updating your password</div>);
  }
};
export const updateInAppNotification = data => async (dispatch) => {
  dispatch({ type: UPDATE_IN_APP_NOTIFICATION_REQUEST });
  try {
    const { message } = await sendHttpRequest('/notifications/inApp', 'PATCH', data);
    if (message === subscribedToInApp) {
      dispatch({
        type: UPDATE_IN_APP_NOTIFICATION_SUCCESS,
        payload: { inAppNotification: true }
      });
      return toast.success(<div>{message}</div>);
    }
    dispatch({
      type: UPDATE_IN_APP_NOTIFICATION_SUCCESS,
      payload: { inAppNotification: false }
    });
    return toast.warn(<div>{message}</div>);
  } catch ({
    response: {
      data: { message }
    }
  }) {
    dispatch({
      type: UPDATE_IN_APP_NOTIFICATION_ERROR,
      payload: message
    });
    toast.error(<div>There was an error subscribing to the InApp notification</div>);
  }
};

export const updateEmailNotification = data => async (dispatch) => {
  dispatch({ type: UPDATE_EMAIL_NOTIFICATION_REQUEST });
  try {
    const { message } = await sendHttpRequest('/notifications/email', 'PATCH', data);
    if (message === subscribedToEmail) {
      dispatch({
        type: UPDATE_EMAIL_NOTIFICATION_SUCCESS,
        payload: { subscribed: true }
      });
      return toast.success(<div>{message}</div>);
    }
    dispatch({
      type: UPDATE_EMAIL_NOTIFICATION_SUCCESS,
      payload: { subscribed: false }
    });
    return toast.warn(<div>{message}</div>);
  } catch ({
    response: {
      data: { message }
    }
  }) {
    dispatch({
      type: UPDATE_EMAIL_NOTIFICATION_ERROR,
      payload: message
    });
    toast.error(<div>There was an error subscribing to email notification</div>);
  }
};
export const updateProfilePic = data => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PROFILE_PIC_REQUEST });
  const {
    user: {
      userData: { username }
    }
  } = getState();
  try {
    const formdata = new FormData();
    formdata.append('image', data);
    const {
      data: { imageUrl },
      message
    } = await sendHttpRequest(`/profiles/${username}/image`, 'PATCH', formdata);
    dispatch({
      type: UPDATE_PROFILE_PIC_SUCCESS,
      payload: { imageUrl }
    });
    return toast.success(<div>{message}</div>);
  } catch ({
    response: {
      data: { message }
    }
  }) {
    dispatch({
      type: UPDATE_PROFILE_PIC_ERROR,
      payload: message
    });
    toast.error(<div>{message}</div>);
  }
};
