import {
  GET_USER_STATS_REQUEST,
  GET_USER_STATS_ERROR,
  GET_USER_STATS_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  data: [],
  error: ''
};

const userStatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STATS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: [...action.payload]
      };
    case GET_USER_STATS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_USER_STATS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userStatReducer;
