import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import jwt from 'jsonwebtoken';
import ConnectedSocialAuthPage from '../../src/components/SocialAuthPage.jsx';
import reducer from '../../src/redux/reducers/authReducer';
import { REGISTER_WITH_SM, SET_CURRENT_USER } from '../../src/redux/actions/actionTypes';
import { loginWithSocialMedia } from '../../src/redux/actions/authActions';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('Social auth page component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedSocialAuthPage />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('social auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoading: false,
      isAuthenticated: false,
      isVerified: false,
      error: '',
      sendResetLink: '',
      updatePassword: ''
    });
  });
  it('should setup reducer to login with social media', () => {
    const successAction = {
      type: REGISTER_WITH_SM
    };
    expect(reducer({}, successAction)).toEqual({
      isAuthenticated: true
    });
  });
});

describe('Auth action creators test', () => {
  const token = jwt.sign({ name: 'omenkish' }, 'yeeeeeeeeeeee', { expiresIn: '24hrs' });
  beforeEach(() => {
    store.clearActions();
  });

  it('should create the REGISTER_WITH_SM and SET_CURRENT_USER actions', () => {
    store.dispatch(loginWithSocialMedia(token));
    expect(store.getActions()).toEqual([
      {
        type: SET_CURRENT_USER,
        user: {
          name: 'omenkish'
        }
      },
      { type: REGISTER_WITH_SM }
    ]);
  });

  it('should fail if token is not provided', () => {
    store.dispatch(loginWithSocialMedia());
    expect(store.getActions()).toEqual([]);
  });
});
