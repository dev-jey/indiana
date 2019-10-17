import React from 'react';
import { toast } from 'react-toastify';
import {
  GET_USER_STATS_REQUEST,
  GET_USER_STATS_SUCCESS,
  GET_USER_STATS_ERROR
} from './actionTypes';
import { sendHttpRequest } from '../../utils/index';

const getUserStat = () => async (dispatch) => {
  dispatch({ type: GET_USER_STATS_REQUEST });
  try {
    const {
      message: { statistics }
    } = await sendHttpRequest('/users/statistics', 'GET');
    dispatch({ type: GET_USER_STATS_SUCCESS, payload: [statistics] });
  } catch (error) {
    dispatch({
      type: GET_USER_STATS_ERROR,
      payload: 'There was an error fetching your statistics'
    });
    toast.error(<div>There was an error fetching your statistics</div>);
  }
};
export default getUserStat;
