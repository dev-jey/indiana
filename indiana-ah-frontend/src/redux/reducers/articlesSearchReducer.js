import {
  SEARCH_ARTICLE_FAILURE,
  SEARCH_ARTICLE_SUCCESS,
  SEARCH_ARTICLE_REQUEST
} from '../actions/actionTypes';

const initialState = {
  searchData: {},
  error: '',
  isLoading: false
};

const articleSearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_ARTICLE_REQUEST:
      return {
        ...state,
        isLoading: true,
        searchData: {},
        error: ''
      };
    case SEARCH_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchData: payload
      };
    case SEARCH_ARTICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default articleSearchReducer;
