import authReducer from '../../src/redux/reducers/authReducer';

import {
  LOGIN_WITH_EMAIL_REQUEST,
  LOGIN_WITH_EMAIL_FAILURE,
  LOGIN_WITH_EMAIL_SUCCESS
} from '../../src/redux/actions/actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isVerified: false,
  error: ''
};

describe('Action for creating article', () => {
  it('should call LOGIN action', () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_WITH_EMAIL_REQUEST
      })
    ).toEqual({ ...initialState, isLoading: true });
    expect(
      authReducer(initialState, {
        type: LOGIN_WITH_EMAIL_FAILURE
      })
    ).toEqual({ ...initialState, isLoading: false, error: undefined });
    expect(
      authReducer(initialState, {
        type: LOGIN_WITH_EMAIL_SUCCESS
      })
    ).toEqual({ ...initialState, isLoading: false, isAuthenticated: true });
  });
});
