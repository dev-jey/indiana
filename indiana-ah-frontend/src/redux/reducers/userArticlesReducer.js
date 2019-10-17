import {
  GET_ALL_USER_ARTICLES_REQUEST,
  GET_ALL_USER_ARTICLES_FAILURE,
  GET_ALL_USER_ARTICLES_SUCCESS,
  DELETE_ARTICLE_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  articleData: {},
  error: ''
};

const userArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_ARTICLES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_ALL_USER_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articleData: action.payload,
        error: ''
      };
    case GET_ALL_USER_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        articleData: {
          ...state.articleData,
          totalCount: state.articleData.totalCount - 1,
          articles: state.articleData.articles.filter(article => article.slug !== action.payload)
        }
      };
    default:
      return state;
  }
};

export default userArticlesReducer;
