import { toast } from 'react-toastify';
import {
  GET_COMMENT_EDIT_HISTORY, COMMENT_EDIT_HISTORY_LOADING
} from './actionTypes';
import { sendHttpRequest } from '../../utils/index';

export default commentId => async (dispatch) => {
  dispatch({ type: COMMENT_EDIT_HISTORY_LOADING });
  try {
    const response = await sendHttpRequest(`/articles/comments/${commentId}/history`, 'GET');
    return dispatch({ type: GET_COMMENT_EDIT_HISTORY, payload: response.commentEditHistory });
  } catch ({ response }) {
    switch (response.status) {
      case 404:
      case 401:
        return toast.error(response.data.message);
      default:
        return toast.error(`Cannot fetch the edited comments at the moment. 
          Please try again later`);
    }
  }
};
