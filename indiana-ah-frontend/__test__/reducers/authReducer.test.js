import authReducer from '../../src/redux/reducers/authReducer';
import {
  REGISTER_WITH_EMAIL_FAILURE,
  REGISTER_WITH_EMAIL_REQUEST,
  REGISTER_WITH_EMAIL_SUCCESS,
  VERIFY_USER_FAILURE,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  SET_CURRENT_USER,
  SIGN_OUT_USER,
  NETWORK_FAILURE,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_LOADING,
  SEND_EMAIL_SUCCESS,
  SEND_RESET_LINK_LOADING,
  SEND_RESET_LINK_SUCCESS,
  SEND_RESET_LINK_FAILURE,
  UPDATE_PASSWORD_LOADING,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
  AUTHENTICATE_USER
} from '../../src/redux/actions/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isVerified: false,
  error: '',
  sendResetLink: '',
  updatePassword: ''
};

describe('authReducer test', () => {
  it('should test for the the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the REGISTER_WITH_EMAIL_REQUEST action', () => {
    expect(authReducer(initialState, { type: REGISTER_WITH_EMAIL_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle the REGISTER_WITH_EMAIL_FAILURE action', () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_WITH_EMAIL_FAILURE,
        payload: 'Email already taken'
      })
    ).toEqual({ ...initialState, isAuthenticated: false, error: 'Email already taken' });
  });

  it('should handle the REGISTER_WITH_EMAIL_SUCCESS action', () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_WITH_EMAIL_SUCCESS,
        payload: {
          email: 'ezenwaogbonna1@gmail.com',
          id: '9e0eu93033-4ieuueu',
          username: 'ozone4real'
        }
      })
    ).toEqual({ ...initialState, isAuthenticated: true });
  });

  it('should handle the VERIFY_USER_REQUEST action', () => {
    expect(authReducer(initialState, { type: VERIFY_USER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle the VERIFY_USER_FAILURE action', () => {
    expect(
      authReducer(initialState, {
        type: VERIFY_USER_FAILURE,
        payload: 'Invalid token supplied'
      })
    ).toEqual({
      ...initialState,
      error: 'Invalid token supplied'
    });
  });

  it('should handle the VERIFY_USER_SUCCESS action', () => {
    expect(
      authReducer(initialState, {
        type: VERIFY_USER_SUCCESS
      })
    ).toEqual({
      ...initialState,
      isAuthenticated: true,
      isVerified: true
    });
  });

  it('should handle the SET_CURRENT_USER action', () => {
    expect(
      authReducer(initialState, {
        type: SET_CURRENT_USER,
        user: { username: 'ozone', email: 'ozone@gmail.com' }
      })
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      error: '',
      isVerified: false
    });
  });

  it('should handle the AUTHENTICATE_USER action', () => {
    expect(
      authReducer(initialState, {
        type: AUTHENTICATE_USER,
        user: { username: 'ozone', email: 'ozone@gmail.com' }
      })
    ).toEqual({
      isLoading: false,
      isAuthenticated: true,
      error: '',
      isVerified: false
    });
  });

  it('should handle the SIGN_OUT_USER action', () => {
    expect(
      authReducer(initialState, {
        type: SIGN_OUT_USER
      })
    ).toEqual(initialState);
  });

  it('should handle the NETWORK_FAILURE failure', () => {
    expect(
      authReducer(initialState, {
        type: NETWORK_FAILURE,
        payload: 'Network error'
      })
    ).toEqual({ ...initialState, error: 'Network error' });
  });

  it('should handle the SEND_EMAIL_LOADING action', () => {
    expect(authReducer(initialState, { type: SEND_EMAIL_LOADING })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle the SEND_EMAIL_SUCCESS action', () => {
    expect(
      authReducer(initialState, {
        type: SEND_EMAIL_SUCCESS
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: '',
      isAuthenticated: true
    });
  });

  it('should handle the SEND_EMAIL_FAILURE action', () => {
    expect(
      authReducer(initialState, {
        type: SEND_EMAIL_FAILURE
      })
    ).toEqual({
      ...initialState,
      isLoading: false
    });
  });

  it('should handle the SEND_RESET_LINK_LOADING action', () => {
    expect(authReducer(initialState, { type: SEND_RESET_LINK_LOADING })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle the SEND_RESET_LINK_SUCCESS action', () => {
    expect(
      authReducer(initialState, {
        type: SEND_RESET_LINK_SUCCESS, payload: 'Success'
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      sendResetLink: 'Success',
      error: ''
    });
  });

  it('should handle the SEND_RESET_LINK_FAILURE action', () => {
    expect(
      authReducer(initialState, {
        type: SEND_RESET_LINK_FAILURE, payload: 'Email is not registered in our system'
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      sendResetLink: '',
      error: 'Email is not registered in our system'
    });
  });

  it('should handle the UPDATE_PASSWORD_LOADING, action', () => {
    expect(authReducer(initialState, { type: UPDATE_PASSWORD_LOADING, })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle the UPDATE_PASSWORD_FAILURE, action', () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_PASSWORD_FAILURE, payload: 'Internal server error'
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      updatePassword: '',
      error: 'Internal server error'
    });
  });

  it('should handle the SEND_RESET_LINK_FAILURE action', () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_PASSWORD_SUCCESS, payload: 'Success'
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      updatePassword: 'Success',
      error: ''
    });
  });
});
