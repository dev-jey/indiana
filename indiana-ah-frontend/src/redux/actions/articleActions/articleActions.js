import React from 'react';
import { toast } from 'react-toastify';

import {
  GET_ALL_ARTICLES,
  NO_ARTICLES,
  GET_ALL_ARTICLES_LOADING,
  GET_ALL_BOOKMARKS_LOADING,
  GET_ALL_BOOKMARKS,
  GET_ALL_BOOKMARKS_FAILURE,
  GET_ALL_ARTICLES_ERROR,
  DELETE_ARTICLE_LOADING,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  SEARCH_ARTICLE_REQUEST,
  SEARCH_ARTICLE_SUCCESS,
  SEARCH_ARTICLE_FAILURE
} from '../actionTypes';
import { sendHttpRequest } from '../../../utils';

export const getAllArticles = () => async (dispatch) => {
  dispatch({ type: GET_ALL_ARTICLES_LOADING });
  try {
    const response = await sendHttpRequest('/articles', 'GET');

    if ('message' in response) {
      return dispatch({ type: NO_ARTICLES, payload: [] });
    }
    return dispatch({ type: GET_ALL_ARTICLES, payload: response.articles });
  } catch ({ response }) {
    dispatch({ type: GET_ALL_ARTICLES_ERROR, payload: [] });
    return toast.error(
      <div>Request was not successful at the moment. Try again later</div>
    );
  }
};

export const getAllUsersBookMarkedArticles = () => async (dispatch) => {
  dispatch({ type: GET_ALL_BOOKMARKS_LOADING });
  try {
    const response = await sendHttpRequest('/users/bookmarks', 'GET');
    return dispatch({ type: GET_ALL_BOOKMARKS, payload: response.userBookmarks || [] });
  } catch ({ response }) {
    dispatch({ type: GET_ALL_BOOKMARKS_FAILURE });
    return toast.error(
      <div>Request was not successful at the moment. Try again later</div>
    );
  }
};

export const deleteArticles = articleSlug => async (dispatch) => {
  dispatch({ type: DELETE_ARTICLE_LOADING });
  try {
    const response = await sendHttpRequest(`/articles/${articleSlug}`, 'DELETE');
    if ('message' in response) {
      return dispatch({ type: DELETE_ARTICLE_SUCCESS, payload: articleSlug });
    }
  } catch ({ response }) {
    dispatch({ type: DELETE_ARTICLE_FAILURE, payload: [] });
    return toast.error(
      <div>Request was not successful at the moment. Try again later</div>
    );
  }
};

export const searchArticles = query => async (dispatch) => {
  dispatch({ type: SEARCH_ARTICLE_REQUEST });
  try {
    const response = await sendHttpRequest(`/articles/search${query}`, 'GET');
    dispatch({ type: SEARCH_ARTICLE_SUCCESS, payload: response });
  } catch ({ response }) {
    dispatch({ type: SEARCH_ARTICLE_FAILURE, payload: response.data.message });
  }
};
