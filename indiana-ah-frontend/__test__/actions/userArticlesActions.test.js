import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { apiInstance } from '../../src/utils';

import {
  GET_ALL_USER_ARTICLES_REQUEST,
  GET_ALL_USER_ARTICLES_SUCCESS,
  GET_ALL_USER_ARTICLES_FAILURE
} from '../../src/redux/actions/actionTypes';
import getAllUserArticles from '../../src/redux/actions/articleActions/userArticlesActions';

const responseData = { articles: [{ articleTitle: 'Im the man' }] };

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('user articles action creator test', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  it('should create the GET_ALL_USER_ARTICLES_SUCCESS action if the api request was successful', async () => {
    mock.onGet('/articles/user/ozone4life?page=1&limit=4').reply(200, responseData);

    const expectedActions = [
      { type: GET_ALL_USER_ARTICLES_REQUEST },
      { type: GET_ALL_USER_ARTICLES_SUCCESS, payload: responseData }
    ];
    await store.dispatch(getAllUserArticles('ozone4life', 'page=1&limit=4'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_ALL_USER_ARTICLES_FAILURE action if the api request failed', async () => {
    mock
      .onGet('/articles/user/tikuo?page=1&limit=4')
      .reply(404, { message: 'User not found' });
    const expectedActions = [
      { type: GET_ALL_USER_ARTICLES_REQUEST },
      { type: GET_ALL_USER_ARTICLES_FAILURE, payload: 'User not found' }
    ];
    await store.dispatch(getAllUserArticles('tikuo', 'page=1&limit=4'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
