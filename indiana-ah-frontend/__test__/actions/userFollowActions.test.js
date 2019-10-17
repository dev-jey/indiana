import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  GET_ALL_USER_FOLLOWING_LOADING,
  GET_ALL_USER_FOLLOWING_FAILURE,
  GET_ALL_USER_FOLLOWING_SUCCESS,
  FOLLOW_USER_LOADING,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_LOADING,
  UNFOLLOW_USER_SUCCESS,
  GET_ALL_USER_FOLLOWERS_LOADING,
  GET_ALL_USER_FOLLOWERS_FAILURE,
  GET_ALL_USER_FOLLOWERS_SUCCESS
} from '../../src/redux/actions/actionTypes';
import {
  followOrUnfollow,
  getAllUsersFollowed,
  getAllFollowers
} from '../../src/redux/actions/userFollowActions';
import { apiInstance } from '../../src/utils';

const user = {};
const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const response = {
  message: 'success'
};
const response2 = {
  data: 'jjjjj'
};
const testUsername = 'Divinelove';

const store = mockStore({ user });

describe('userFollowActions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('should create the FOLLOW_USER_SUCCESS action if the api request was successful', async () => {
    mock.onPost(`/profiles/${testUsername}/follow`).reply(200, response);

    const expectedActions = [
      { type: FOLLOW_USER_LOADING },
      { type: FOLLOW_USER_SUCCESS, payload: { username: 'Divinelove' } }
    ];

    await store.dispatch(followOrUnfollow('Divinelove', 'Follow'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the FOLLOW_USER_FAILURE action if the api request was not successful', async () => {
    mock.onPost(`/profiles/${testUsername}/follow`).reply(503);

    const expectedActions = [
      { type: FOLLOW_USER_LOADING },
      { type: FOLLOW_USER_FAILURE }
    ];

    await store.dispatch(followOrUnfollow('Divinelove', 'Follow'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the UNFOLLOW_USER_SUCCESS action if the api request was successful', async () => {
    mock.onPost(`/profiles/${testUsername}/follow`).reply(200, response);

    const expectedActions = [
      { type: UNFOLLOW_USER_LOADING },
      { type: UNFOLLOW_USER_SUCCESS, payload: 'Divinelove' }
    ];

    await store.dispatch(followOrUnfollow('Divinelove', 'Unfollow'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the UNFOLLOW_USER_FAILURE action if the api request was not successful', async () => {
    mock.onPost(`/profiles/${testUsername}/follow`).reply(503);

    const expectedActions = [
      { type: UNFOLLOW_USER_LOADING },
      { type: UNFOLLOW_USER_FAILURE }
    ];

    await store.dispatch(followOrUnfollow('Divinelove', 'Unfollow'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_ALL_USER_FOLLOWING_SUCCESS action if the api request was successful', async () => {
    mock.onGet('/profiles/users/following').reply(200, response);

    const expectedActions = [
      { type: GET_ALL_USER_FOLLOWING_LOADING },
      { type: GET_ALL_USER_FOLLOWING_SUCCESS, payload: { following: [], count: 0 } }
    ];

    await store.dispatch(getAllUsersFollowed());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_ALL_USER_FOLLOWING_SUCCESS action if the api request was successful and there is no message in the response', async () => {
    mock.onGet('/profiles/users/following').reply(200, response2);

    const expectedActions = [
      { type: GET_ALL_USER_FOLLOWING_LOADING },
      { type: GET_ALL_USER_FOLLOWING_SUCCESS, payload: response2 }
    ];

    await store.dispatch(getAllUsersFollowed());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_ALL_USER_FOLLOWING_FAILURE action if the api request was not successful', async () => {
    mock.onGet('/profiles/users/following').reply(503);

    const expectedActions = [
      { type: GET_ALL_USER_FOLLOWING_LOADING },
      { type: GET_ALL_USER_FOLLOWING_FAILURE }
    ];

    await store.dispatch(getAllUsersFollowed());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_ALL_USER_FOLLOWERS_SUCCESS action if the api request was successful', async () => {
    mock.onGet('/profiles/users/followers').reply(200, response);

    const expectedActions = [
      { type: GET_ALL_USER_FOLLOWERS_LOADING },
      { type: GET_ALL_USER_FOLLOWERS_SUCCESS, payload: { following: [], count: 0 } }
    ];

    await store.dispatch(getAllFollowers());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_ALL_USER_FOLLOWERS_SUCCESS action if the api request was successful and there is no message in the response', async () => {
    mock.onGet('/profiles/users/followers').reply(200, response2);

    const expectedActions = [
      { type: GET_ALL_USER_FOLLOWERS_LOADING },
      { type: GET_ALL_USER_FOLLOWERS_SUCCESS, payload: response2 }
    ];

    await store.dispatch(getAllFollowers());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_ALL_USER_FOLLOWERS_FAILURE action if the api request was not successful', async () => {
    mock.onGet('/profiles/users/followers').reply(503);

    const expectedActions = [
      { type: GET_ALL_USER_FOLLOWERS_LOADING },
      { type: GET_ALL_USER_FOLLOWERS_FAILURE }
    ];

    await store.dispatch(getAllFollowers());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
