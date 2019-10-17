import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import thunk from 'redux-thunk';
import { toast } from 'react-toastify';

import configureMockStore from 'redux-mock-store';

import { apiInstance, sendHttpRequest } from '../../src/utils';

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
} from '../../src/redux/actions/actionTypes';
import {
  getUserProfile,
  updateEmailNotification,
  updateInAppNotification,
  updatePassword,
  updateUserProfile,
  updateProfilePic
} from '../../src/redux/actions/profileActions';

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

const response = {
  response: {
    data: { message: 'error' }
  }
};

describe('Profile actions for the user', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('should successfully fetch the user"s profile', async () => {
    sendHttpRequest.mockResolvedValue({
      profile: {}
    });
    const expectedActions = [
      { type: GET_USER_PROFILE_REQUEST },
      { type: GET_USER_PROFILE_SUCCESS, payload: {} }
    ];

    await store.dispatch(getUserProfile());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail to get a user"s profile', async () => {
    sendHttpRequest.mockRejectedValue();
    const expectedActions = [
      { type: GET_USER_PROFILE_REQUEST },
      {
        type: GET_USER_PROFILE_ERROR,
        payload: 'There was an error fetching your profile'
      }
    ];

    await store.dispatch(getUserProfile());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should update a user"s profile successfully', async () => {
    sendHttpRequest.mockResolvedValue({
      profile: {}
    });
    const expectedActions = [
      { type: UPDATE_USER_PROFILE_REQUEST },
      {
        type: UPDATE_USER_PROFILE_SUCCESS,
        payload: {}
      }
    ];

    await store.dispatch(updateUserProfile({}));
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.success).toHaveBeenCalledWith(<div>updated profile successfully</div>);
  });

  it('should fail to update a user"s profile', async () => {
    sendHttpRequest.mockRejectedValue(response);
    const expectedActions = [
      { type: UPDATE_USER_PROFILE_REQUEST },
      {
        type: UPDATE_USER_PROFILE_ERROR,
        payload: 'error'
      }
    ];

    await store.dispatch(updateUserProfile());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should fail to update a user"s profile picture', async () => {
    mock.onPatch('/profiles/dondon/image').reply(400, {});
    const expectedActions = [
      { type: UPDATE_PROFILE_PIC_REQUEST },
      {
        type: UPDATE_PROFILE_PIC_ERROR,
        payload: 'error'
      }
    ];

    await store.dispatch(updateProfilePic());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should update a user"s profile picture', async () => {
    sendHttpRequest.mockResolvedValue({
      data: { imageUrl: 'image' },
      message: 'update successfully'
    });
    const expectedActions = [
      { type: UPDATE_PROFILE_PIC_REQUEST },
      {
        type: UPDATE_PROFILE_PIC_SUCCESS,
        payload: { imageUrl: 'image' }
      }
    ];

    await store.dispatch(updateProfilePic({}));
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.success).toHaveBeenCalledWith(<div>update successfully</div>);
  });
  it('should opt-in for email notification', async () => {
    sendHttpRequest.mockResolvedValue({
      message: 'You have successfully subscribed to our email notifications'
    });
    const expectedActions = [
      { type: UPDATE_EMAIL_NOTIFICATION_REQUEST },
      {
        type: UPDATE_EMAIL_NOTIFICATION_SUCCESS,
        payload: { subscribed: true }
      }
    ];

    await store.dispatch(updateEmailNotification({}));
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.success).toHaveBeenCalledWith(
      <div>You have successfully subscribed to our email notifications</div>
    );
  });
  it('should opt-in for in-App notification', async () => {
    sendHttpRequest.mockResolvedValue({
      message: 'You have successfully subscribed to in app notifications'
    });
    const expectedActions = [
      { type: UPDATE_IN_APP_NOTIFICATION_REQUEST },
      {
        type: UPDATE_IN_APP_NOTIFICATION_SUCCESS,
        payload: { inAppNotification: true }
      }
    ];

    await store.dispatch(updateInAppNotification({}));
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.success).toHaveBeenCalledWith(
      <div>You have successfully subscribed to in app notifications</div>
    );
  });
  it('should opt-out for email notification', async () => {
    sendHttpRequest.mockResolvedValue({
      message: 'You have successfully unsubscribed to our email notifications'
    });
    const expectedActions = [
      { type: UPDATE_EMAIL_NOTIFICATION_REQUEST },
      {
        type: UPDATE_EMAIL_NOTIFICATION_SUCCESS,
        payload: { subscribed: false }
      }
    ];

    await store.dispatch(updateEmailNotification({}));
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.warn).toHaveBeenCalledWith(
      <div>You have successfully unsubscribed to our email notifications</div>
    );
  });

  it('should opt-out for in-App notification', async () => {
    sendHttpRequest.mockResolvedValue({
      message: 'You have successfully unsubscribed to our in-App notifications'
    });
    const expectedActions = [
      { type: UPDATE_IN_APP_NOTIFICATION_REQUEST },
      {
        type: UPDATE_IN_APP_NOTIFICATION_SUCCESS,
        payload: { inAppNotification: false }
      }
    ];

    await store.dispatch(updateInAppNotification({}));
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.warn).toHaveBeenCalledWith(
      <div>You have successfully unsubscribed to our in-App notifications</div>
    );
  });

  it('should throw an error for email notification', async () => {
    sendHttpRequest.mockRejectedValue({
      response: {
        data: { message: 'There was an error subscribing to email notification' }
      }
    });
    const expectedActions = [
      { type: UPDATE_EMAIL_NOTIFICATION_REQUEST },
      {
        type: UPDATE_EMAIL_NOTIFICATION_ERROR,
        payload: 'There was an error subscribing to email notification'
      }
    ];

    await store.dispatch(updateEmailNotification());
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.error).toHaveBeenCalledWith(
      <div>There was an error subscribing to email notification</div>
    );
  });

  it('should throw an error for in-App notification', async () => {
    sendHttpRequest.mockRejectedValue({
      response: {
        data: { message: 'There was an error subscribing to the InApp notification' }
      }
    });
    const expectedActions = [
      { type: UPDATE_IN_APP_NOTIFICATION_REQUEST },
      {
        type: UPDATE_IN_APP_NOTIFICATION_ERROR,
        payload: 'There was an error subscribing to the InApp notification'
      }
    ];

    await store.dispatch(updateInAppNotification());
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.error).toHaveBeenCalledWith(
      <div>There was an error subscribing to the InApp notification</div>
    );
  });

  it('should update password successfully', async () => {
    sendHttpRequest.mockResolvedValue({});
    const expectedActions = [
      { type: UPDATE_USER_PASSWORD_REQUEST },
      {
        type: UPDATE_USER_PASSWORD_SUCCESS
      }
    ];

    await store.dispatch(updatePassword({}));
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.success).toHaveBeenCalledWith(<div>updated password successfully</div>);
  });
  it('should throw error for password update', async () => {
    sendHttpRequest.mockRejectedValue(response);
    const expectedActions = [
      { type: UPDATE_USER_PASSWORD_REQUEST },
      {
        type: UPDATE_USER_PASSWORD_ERROR,
        payload: 'error'
      }
    ];

    await store.dispatch(updatePassword());
    expect(store.getActions()).toEqual(expectedActions);
    expect(toast.error).toHaveBeenCalledWith(
      <div>There was an error updating your password</div>
    );
  });
});
