import { toast } from 'react-toastify';
import {
  ADD_COMMENT,
  GET_ALL_ARTICLE_COMMENTS,
  DELETE_COMMENT,
  COMMENTS_LOADING,
  EDIT_COMMENT,
  EDIT_COMMENTS_FAILURE
} from './actionTypes';
import { sendHttpRequest, addUserReaction } from '../../utils/index';

export const addComment = (articleSlug, commentData) => async (dispatch, getState) => {
  const user = getState().user.userData;
  const commenter = {
    name: user.name,
    username: user.username,
    imageUrl: user.imageUrl
  };
  dispatch({ type: COMMENTS_LOADING });
  try {
    const response = await sendHttpRequest(
      `/articles/${articleSlug}/comments`,
      'POST',
      commentData
    );
    const commentDetails = response.data;
    commentDetails.commenter = commenter;
    commentDetails.likes = 0;
    commentDetails.dislikes = 0;
    return dispatch({ type: ADD_COMMENT, payload: commentDetails });
  } catch ({ response }) {
    switch (response.status) {
      case 404:
      case 401:
        return toast.error(response.data.message);
      default:
        return toast.error(`Cannot comment on this article at the moment.
          Please try again later`);
    }
  }
};

export const getArticleComments = articleSlug => async (dispatch, getState) => {
  const { id } = getState().user.userData;
  try {
    const response = await sendHttpRequest(`/articles/${articleSlug}/comments`, 'GET');
    const comments = response.comments.map((comment) => {
      const likes = comment.CommentReactions.filter(
        reaction => reaction.reactionType === 'like'
      );
      const dislikes = comment.CommentReactions.filter(
        reaction => reaction.reactionType === 'dislike'
      );
      comment.likes = likes.length;
      comment.dislikes = dislikes.length;
      addUserReaction(comment, 'CommentReactions', id);
      return comment;
    });
    return dispatch({ type: GET_ALL_ARTICLE_COMMENTS, payload: comments });
  } catch ({ response }) {
    switch (response.status) {
      case 404:
      case 401:
        return toast.error(response.data.message);
      default:
        return toast.error(`Cannot fetch the comments on this article at the moment. 
          Please try again later`);
    }
  }
};

export const deleteComment = id => async (dispatch) => {
  dispatch({ type: COMMENTS_LOADING });
  try {
    const response = await sendHttpRequest(`/comments/${id}`, 'DELETE', {
      commentId: id
    });
    toast.success(response.message);
    return dispatch({ type: DELETE_COMMENT, id });
  } catch (error) {
    switch (error.response.status) {
      case 404:
      case 401:
        return toast.error(error.response.data.message);
      default:
        return toast.error(`Cannot delete this comment at the moment.
          Please try again later`);
    }
  }
};

export const editComment = (id, commentData) => async (dispatch, getState) => {
  const user = getState().user.userData;
  const commenter = {
    name: user.name,
    username: user.username,
    imageUrl: user.imageUrl
  };
  const commentBody = commentData;
  dispatch({ type: COMMENTS_LOADING });
  try {
    const response = await sendHttpRequest(`/articles/comments/${id}/`, 'PUT', {
      commentBody
    });
    const commentDetails = response.comment;
    commentDetails.commenter = commenter;
    dispatch({ type: EDIT_COMMENT, payload: commentDetails });
    return response.message;
  } catch ({ response }) {
    dispatch({ type: EDIT_COMMENTS_FAILURE, payload: response });
  }
};
