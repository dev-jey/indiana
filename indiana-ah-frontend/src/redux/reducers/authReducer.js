import {
  REGISTER_WITH_EMAIL_REQUEST,
  REGISTER_WITH_EMAIL_FAILURE,
  REGISTER_WITH_EMAIL_SUCCESS,
  VERIFY_USER_REQUEST,
  VERIFY_USER_FAILURE,
  VERIFY_USER_SUCCESS,
  NETWORK_FAILURE,
  SET_CURRENT_USER,
  SIGN_OUT_USER,
  REGISTER_WITH_SM,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_LOADING,
  SEND_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_SUCCESS,
  AUTHENTICATE_USER,
  SEND_RESET_LINK_LOADING,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_FAILURE,
  UPDATE_PASSWORD_LOADING,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isVerified: false,
  error: '',
  sendResetLink: '',
  updatePassword: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_WITH_EMAIL_REQUEST:
      return { ...state, isLoading: true, error: '' };
    case REGISTER_WITH_EMAIL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case REGISTER_WITH_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        isAuthenticated: true
      };
    case VERIFY_USER_REQUEST:
      return { ...state, isLoading: true, error: '' };
    case VERIFY_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case VERIFY_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        isAuthenticated: true,
        isVerified: true
      };
    case NETWORK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case AUTHENTICATE_USER:
    case SET_CURRENT_USER:
      return {
        isLoading: false,
        error: '',
        isAuthenticated: true,
        isVerified: action.user.isVerified || false
      };
    case SIGN_OUT_USER:
      return initialState;
    case REGISTER_WITH_SM:
      return {
        ...state,
        isAuthenticated: true
      };
    case SEND_EMAIL_LOADING:
      return { ...state, isLoading: true, error: '' };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        isAuthenticated: true
      };
    case SEND_EMAIL_FAILURE:
      return { ...state, isLoading: false };
    case SEND_RESET_LINK_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SEND_RESET_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendResetLink: action.payload,
        error: ''
      };
    case SEND_RESET_LINK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        sendResetLink: ''
      };
    case UPDATE_PASSWORD_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        updatePassword: action.payload,
        error: ''
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        updatePassword: ''
      };
    case LOGIN_WITH_EMAIL_REQUEST:
      return { ...state, isLoading: true, error: '' };
    case LOGIN_WITH_EMAIL_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case LOGIN_WITH_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        isAuthenticated: true
      };
    default:
      return state;
  }
};

export default authReducer;
