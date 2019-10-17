import { toast } from 'react-toastify';
import React from 'react';
import { sendHttpRequest } from '../../utils';

import {
  GET_ALL_USER_FOLLOWING_LOADING,
  GET_ALL_USER_FOLLOWING_SUCCESS,
  GET_ALL_USER_FOLLOWING_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_LOADING,
  FOLLOW_USER_LOADING,
  GET_ALL_USER_FOLLOWERS_LOADING,
  GET_ALL_USER_FOLLOWERS_SUCCESS,
  GET_ALL_USER_FOLLOWERS_FAILURE
} from './actionTypes';

export const getAllUsersFollowed = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_FOLLOWING_LOADING });
  try {
    const response = await sendHttpRequest('/profiles/users/following', 'GET');
    if ('message' in response) {
      return dispatch({ type: GET_ALL_USER_FOLLOWING_SUCCESS, payload: { following: [], count: 0 } });
    }
    dispatch({ type: GET_ALL_USER_FOLLOWING_SUCCESS, payload: response });
  } catch ({ response }) {
    toast.error(<div>failed to fetch users you follow</div>);
    return dispatch({ type: GET_ALL_USER_FOLLOWING_FAILURE });
  }
};

export const getAllFollowers = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_FOLLOWERS_LOADING });
  try {
    const response = await sendHttpRequest('/profiles/users/followers', 'GET');
    if ('message' in response) {
      return dispatch({ type: GET_ALL_USER_FOLLOWERS_SUCCESS, payload: { following: [], count: 0 } });
    }
    dispatch({ type: GET_ALL_USER_FOLLOWERS_SUCCESS, payload: response });
  } catch ({ response }) {
    toast.error(<div>failed to fetch followers</div>);
    return dispatch({ type: GET_ALL_USER_FOLLOWERS_FAILURE });
  }
};

export const followOrUnfollow = (username, action) => async (dispatch) => {
  dispatch({ type: action === 'Unfollow' ? UNFOLLOW_USER_LOADING : FOLLOW_USER_LOADING });
  try {
    const response = await sendHttpRequest(`/profiles/${username}/follow`, 'POST');
    if ('message' in response) {
      return dispatch({
        type: action === 'Unfollow' ? UNFOLLOW_USER_SUCCESS : FOLLOW_USER_SUCCESS,
        payload: action === 'Follow' ? { username } : username
      });
    }
  } catch ({ response }) {
    toast.error(<div>failed to unfollow {username}</div>);
    return dispatch({
      type: action === 'Unfollow' ? UNFOLLOW_USER_FAILURE : FOLLOW_USER_FAILURE,
    });
  }
};
