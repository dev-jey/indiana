import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_IN_APP_NOTIFICATION_SUCCESS,
  UPDATE_IN_APP_NOTIFICATION_ERROR,
  UPDATE_IN_APP_NOTIFICATION_REQUEST,
  UPDATE_EMAIL_NOTIFICATION_SUCCESS,
  UPDATE_EMAIL_NOTIFICATION_ERROR,
  UPDATE_EMAIL_NOTIFICATION_REQUEST,
  UPDATE_PROFILE_PIC_SUCCESS,
  UPDATE_PROFILE_PIC_ERROR,
  UPDATE_PROFILE_PIC_REQUEST
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  userProfile: {},
  error: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: action.payload
      };
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_PROFILE_PIC_REQUEST:
    case GET_USER_PROFILE_REQUEST:
    case UPDATE_USER_PROFILE_REQUEST:
    case UPDATE_USER_PASSWORD_REQUEST:
    case UPDATE_EMAIL_NOTIFICATION_REQUEST:
    case UPDATE_IN_APP_NOTIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_USER_PROFILE_ERROR:
    case GET_USER_PROFILE_ERROR:
    case UPDATE_PROFILE_PIC_ERROR:
    case UPDATE_USER_PASSWORD_ERROR:
    case UPDATE_EMAIL_NOTIFICATION_ERROR:
    case UPDATE_IN_APP_NOTIFICATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_PROFILE_PIC_SUCCESS:
    case UPDATE_USER_PROFILE_SUCCESS:
    case UPDATE_EMAIL_NOTIFICATION_SUCCESS:
    case UPDATE_IN_APP_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: { ...state.userProfile, ...action.payload }
      };
    default:
      return state;
  }
};

export default profileReducer;
