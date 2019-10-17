import {
  ADD_COMMENT,
  GET_ALL_ARTICLE_COMMENTS,
  COMMENTS_LOADING,
  DELETE_COMMENT,
  EDIT_COMMENT,
  EDIT_COMMENTS_FAILURE,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
} from '../actions/actionTypes';
import { recordDisLike, recordLike } from '../../utils';

const initialState = {
  isLoading: false,
  comments: []
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: [action.payload, ...state.comments]
      };

    case GET_ALL_ARTICLE_COMMENTS:
      return {
        ...state,
        isLoading: false,
        comments: action.payload
      };
    case DELETE_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter(comment => comment.id !== action.id)
      };
    case EDIT_COMMENT:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.map(comment => (comment.id === action.payload.id ? action.payload : comment))
      };
    case EDIT_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case LIKE_COMMENT: {
      const comments = [...state.comments];
      const index = comments.indexOf(
        comments.find(comment => comment.id === action.payload)
      );
      recordLike(comments[index]);
      return {
        ...state,
        isLoading: false,
        comments
      };
    }

    case DISLIKE_COMMENT: {
      const comments = [...state.comments];
      const index = comments.indexOf(
        comments.find(comment => comment.id === action.payload)
      );
      recordDisLike(comments[index]);
      return {
        ...state,
        isLoading: false,
        comments
      };
    }

    default:
      return state;
  }
};
export default commentReducer;
