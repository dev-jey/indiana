import {
  GET_COMMENT_EDIT_HISTORY, COMMENT_EDIT_HISTORY_LOADING
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  editHistory: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_EDIT_HISTORY_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case GET_COMMENT_EDIT_HISTORY:
      return {
        ...state,
        isLoading: false,
        editHistory: action.payload,
      };
    default:
      return state;
  }
};
