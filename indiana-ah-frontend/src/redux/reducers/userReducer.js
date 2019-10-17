import {
  SET_CURRENT_USER,
  SIGN_OUT_USER,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_REQUEST,
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
  userData: {},
  isLoading: false,
  error: ''
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        userData: action.user
      };
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: ''
      };
    case GET_USER_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: action.payload
      };
    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_USER_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: { ...state.userData, ...action.payload }
      };
    case UPDATE_USER_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_USER_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_IN_APP_NOTIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_IN_APP_NOTIFICATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_IN_APP_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: { ...state.userData, ...action.payload }
      };
    case UPDATE_EMAIL_NOTIFICATION_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_EMAIL_NOTIFICATION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_EMAIL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: { ...state.userData, ...action.payload }
      };
    case UPDATE_PROFILE_PIC_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROFILE_PIC_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userData: { ...state.userData, ...action.payload }
      };
    case SIGN_OUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
