import React from 'react';
import { toast } from 'react-toastify';
import { GET_SINGLE_ARTICLE_LOADING, GET_SINGLE_ARTICLE_SUCCESS } from '../actionTypes';
import { sendHttpRequest, addUserReaction } from '../../../utils';

const getSingleArticle = (slug, history) => async (dispatch, getState) => {
  const { id } = getState().user.userData;
  dispatch({
    type: GET_SINGLE_ARTICLE_LOADING
  });
  try {
    const { article, timeToRead } = await sendHttpRequest(`/articles/${slug}`, 'GET');
    addUserReaction(article, 'Reactions', id);
    article.timeToRead = timeToRead;
    dispatch({
      type: GET_SINGLE_ARTICLE_SUCCESS,
      payload: article
    });
    return article;
  } catch ({ response }) {
    if (response.status === 404) {
      history.push('/not-found');
    } else {
      history.push('/');
      toast.error(<div>Request was not successful at the moment. Try again later</div>);
    }
  }
};

export default getSingleArticle;
