import {
  GET_ALL_BOOKMARKS,
  GET_ALL_BOOKMARKS_LOADING,
  GET_ALL_BOOKMARKS_FAILURE,
  ADD_BOOKMARK, REMOVE_BOOKMARK
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  userBookmarks: [],
  error: false
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOOKMARKS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_BOOKMARKS:
      return {
        ...state,
        userBookmarks: action.payload,
        isLoading: false,
        error: false
      };
    case GET_ALL_BOOKMARKS_FAILURE:
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    case ADD_BOOKMARK:
      return {
        ...state,
        userBookmarks: [...state.userBookmarks, action.payload]
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        userBookmarks: state.userBookmarks.filter(post => post.articleId !== action.id)
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
