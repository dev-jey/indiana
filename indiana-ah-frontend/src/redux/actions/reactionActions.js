import { sendHttpRequest } from '../../utils';
import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_COMMENT,
  DISLIKE_COMMENT
} from './actionTypes';

export const reactToArticle = (slug, reactionType) => async (dispatch) => {
  dispatch({
    type: reactionType === 'like' ? LIKE_ARTICLE : DISLIKE_ARTICLE
  });
  try {
    await sendHttpRequest(`/articles/${slug}/reaction`, 'POST', {
      reactionType
    });
  } catch (error) {
    return error;
  }
};

export const reactToComment = (id, reactionType) => async (dispatch) => {
  dispatch({
    type: reactionType === 'like' ? LIKE_COMMENT : DISLIKE_COMMENT,
    payload: id
  });
  try {
    await sendHttpRequest('/comments/reaction', 'POST', {
      reactionType,
      commentId: id
    });
  } catch (error) {
    return error;
  }
};
