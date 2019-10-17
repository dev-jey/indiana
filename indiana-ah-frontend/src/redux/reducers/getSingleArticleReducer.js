import {
  GET_SINGLE_ARTICLE_LOADING,
  GET_SINGLE_ARTICLE_SUCCESS,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE
} from '../actions/actionTypes';
import { recordDisLike, recordLike } from '../../utils';

const initialArticleState = {
  isLoading: false,
  article: {}
};

const getSingleArticleReducer = (state = initialArticleState, { type, payload }) => {
  switch (type) {
    case GET_SINGLE_ARTICLE_LOADING:
      return {
        ...state,
        isLoading: true,
        article: {}
      };
    case GET_SINGLE_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        article: payload
      };
    case LIKE_ARTICLE: {
      const { article } = state;
      recordLike(article);
      return { ...state, isLoading: false, article };
    }

    case DISLIKE_ARTICLE: {
      const { article } = state;
      recordDisLike(article);
      return { ...state, isLoading: false, article };
    }
    default:
      return state;
  }
};

export default getSingleArticleReducer;
