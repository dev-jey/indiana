import {
  SET_CURRENT_USER,
  SIGN_OUT_USER,
  GET_USER_PROFILE_REQUEST,
  UPDATE_PROFILE_PIC_SUCCESS,
  UPDATE_PROFILE_PIC_ERROR,
  UPDATE_PROFILE_PIC_REQUEST,
  UPDATE_EMAIL_NOTIFICATION_SUCCESS,
  UPDATE_EMAIL_NOTIFICATION_ERROR,
  UPDATE_EMAIL_NOTIFICATION_REQUEST,
  UPDATE_IN_APP_NOTIFICATION_REQUEST,
  UPDATE_IN_APP_NOTIFICATION_SUCCESS,
  UPDATE_IN_APP_NOTIFICATION_ERROR,
  UPDATE_USER_PASSWORD_ERROR,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_ERROR,
  UPDATE_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR
} from '../../src/redux/actions/actionTypes';
import userReducer from '../../src/redux/reducers/userReducer';

const initialState = {
  error: '',
  isLoading: false,
  userData: {}
};

const user = {
  username: 'omenkish',
  email: 'shkdjddkkkkdkd@gmail.com'
};

describe('User reducer test', () => {
  it('should test the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle the SET_CURRENT_USER action', () => {
    expect(userReducer(initialState, { type: SET_CURRENT_USER, user })).toEqual({
      userData: user
    });
  });

  it('should handle the SIGN_OUT_USER action', () => {
    expect(
      userReducer(initialState, {
        type: SIGN_OUT_USER
      })
    ).toEqual(initialState);
  });
  it('should handle get user profile request', () => {
    expect(userReducer(initialState, { type: GET_USER_PROFILE_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('should handle get user profile error', () => {
    expect(
      userReducer(initialState, { type: GET_USER_PROFILE_ERROR, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: {}
    });
  });
  it('should handle get user profile success', () => {
    expect(
      userReducer(initialState, { type: GET_USER_PROFILE_SUCCESS, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      userData: {}
    });
  });
  it('should handle update profile pic success', () => {
    expect(
      userReducer(initialState, { type: UPDATE_PROFILE_PIC_SUCCESS, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      userData: {}
    });
  });
  it('should handle update profile pic error', () => {
    expect(
      userReducer(initialState, { type: UPDATE_PROFILE_PIC_ERROR, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: {}
    });
  });
  it('should handle update profile pic request', () => {
    expect(userReducer(initialState, { type: UPDATE_PROFILE_PIC_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('should handle update email notification pic request', () => {
    expect(
      userReducer(initialState, { type: UPDATE_EMAIL_NOTIFICATION_REQUEST })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('should handle update email notification pic success', () => {
    expect(
      userReducer(initialState, { type: UPDATE_EMAIL_NOTIFICATION_SUCCESS, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      userData: {}
    });
  });
  it('should handle update email notification pic error', () => {
    expect(
      userReducer(initialState, { type: UPDATE_EMAIL_NOTIFICATION_ERROR, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: {}
    });
  });
  it('should handle update InApp notification pic request', () => {
    expect(
      userReducer(initialState, { type: UPDATE_IN_APP_NOTIFICATION_REQUEST })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('should handle update InApp notification pic success', () => {
    expect(
      userReducer(initialState, { type: UPDATE_IN_APP_NOTIFICATION_SUCCESS, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      userData: {}
    });
  });
  it('should handle update InApp notification pic error', () => {
    expect(
      userReducer(initialState, { type: UPDATE_IN_APP_NOTIFICATION_ERROR, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: {}
    });
  });
  it('should handle update user password error', () => {
    expect(
      userReducer(initialState, { type: UPDATE_USER_PASSWORD_ERROR, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: {}
    });
  });
  it('should handle update user password request', () => {
    expect(userReducer(initialState, { type: UPDATE_USER_PASSWORD_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('should handle update user password success', () => {
    expect(userReducer(initialState, { type: UPDATE_USER_PASSWORD_SUCCESS })).toEqual({
      ...initialState,
      isLoading: false
    });
  });
  it('should handle update user profile success', () => {
    expect(
      userReducer(initialState, { type: UPDATE_USER_PROFILE_SUCCESS, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      userData: {}
    });
  });
  it('should handle update user profile error', () => {
    expect(
      userReducer(initialState, { type: UPDATE_USER_PROFILE_ERROR, payload: {} })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: {}
    });
  });
  it('should handle update user profile request', () => {
    expect(userReducer(initialState, { type: UPDATE_USER_PROFILE_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });
});
