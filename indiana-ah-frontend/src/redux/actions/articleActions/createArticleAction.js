import { toast } from 'react-toastify';
import React from 'react';
import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_FAILURE,
  CREATE_ARTICLE_LOADING
} from '../actionTypes';
import { sendHttpRequest } from '../../../utils';

const createArticle = article => ({
  type: CREATE_ARTICLE,
  article
});
const createArticleFailure = error => ({
  type: CREATE_ARTICLE_FAILURE,
  error
});

const createUserArticle = (data, { history, match }) => async (dispatch) => {
  dispatch({ type: CREATE_ARTICLE_LOADING });
  try {
    if (match.params.slug) {
      const { article } = await sendHttpRequest(
        `/articles/${match.params.slug}/update`,
        'PUT',
        data,
        {
          'content-type': 'multipart/form-data'
        }
      );
      dispatch(createArticle(article));
      toast.success(<div>Article updated successfully</div>);
      history.push(`/articles/${article.slug}`);
      return;
    }
    const { article } = await sendHttpRequest('/articles', 'POST', data, {
      'content-type': 'multipart/form-data'
    });
    dispatch(createArticle(article));
    toast.success(<div>Article successfully created</div>);
    history.push(`/articles/${article.slug}`);
  } catch ({ response }) {
    dispatch(createArticleFailure(response.data));
  }
};

export default createUserArticle;
