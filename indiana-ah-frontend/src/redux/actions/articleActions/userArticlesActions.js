import { sendHttpRequest } from '../../../utils';
import {
  GET_ALL_USER_ARTICLES_REQUEST,
  GET_ALL_USER_ARTICLES_FAILURE,
  GET_ALL_USER_ARTICLES_SUCCESS
} from '../actionTypes';

const getAllUserArticles = (username, query) => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_ARTICLES_REQUEST });
  try {
    const response = await sendHttpRequest(`/articles/user/${username}?${query}`, 'GET');
    dispatch({ type: GET_ALL_USER_ARTICLES_SUCCESS, payload: response });
  } catch ({ response }) {
    dispatch({
      type: GET_ALL_USER_ARTICLES_FAILURE,
      payload: response.data.message
    });
  }
};

export default getAllUserArticles;
