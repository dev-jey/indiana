import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { apiInstance } from '../../../utils/index';
import { getAllArticles, searchArticles } from './articleActions';
import {
  GET_ALL_ARTICLES,
  NO_ARTICLES,
  GET_ALL_ARTICLES_LOADING,
  GET_ALL_ARTICLES_ERROR,
  SEARCH_ARTICLE_REQUEST,
  SEARCH_ARTICLE_FAILURE,
  SEARCH_ARTICLE_SUCCESS
} from '../actionTypes';

const mock = new MockAdapter(apiInstance);
const mockStore = configureStore([thunk]);
const store = mockStore({});
const mockData = {
  articles: [
    {
      title: 'How I got into andela',
      slug: 'How I got into andela'
    }
  ]
};
const noData = {
  message: 'No articles found'
};
const error = {
  status: 500,
  data: { Error: 'Request failed with status code 500' },
  headers: undefined,
  config: {}
};

describe('get all article action', () => {
  it('handles getting all articles', async () => {
    mock.onGet('/articles').reply(200, mockData);

    const expectedActions = [
      {
        type: GET_ALL_ARTICLES_LOADING
      },
      {
        type: GET_ALL_ARTICLES,
        payload: mockData.articles
      }
    ];

    await store.dispatch(getAllArticles());
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
  });

  it('handles getting all articles when there is no article returned', async () => {
    mock.onGet('/articles').reply(200, noData);

    const expectedActions = [
      {
        type: GET_ALL_ARTICLES_LOADING
      },
      {
        type: GET_ALL_ARTICLES,
        payload: mockData.articles
      },
      {
        type: GET_ALL_ARTICLES_LOADING
      },
      {
        type: NO_ARTICLES,
        payload: []
      }
    ];

    await store.dispatch(getAllArticles());
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
  });

  it('handles error events', async () => {
    mock.onGet('/articles').reply(500, error);

    const expectedActions = [
      {
        type: GET_ALL_ARTICLES_LOADING
      },
      {
        type: GET_ALL_ARTICLES,
        payload: mockData.articles
      },
      {
        type: GET_ALL_ARTICLES_LOADING
      },
      {
        type: NO_ARTICLES,
        payload: []
      },
      {
        type: GET_ALL_ARTICLES_LOADING
      },
      {
        payload: [],
        type: GET_ALL_ARTICLES_ERROR
      }
    ];

    await store.dispatch(getAllArticles());
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
  });
});

describe('Search Articles action creator test', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should create the SEARCH_ARTICLE_FAILURE action if the request was not successful', async () => {
    mock
      .onGet('/articles/search?h=20')
      .reply(400, { message: 'Invalid search parameter' });
    const expectedActions = [
      { type: SEARCH_ARTICLE_REQUEST },
      { type: SEARCH_ARTICLE_FAILURE, payload: 'Invalid search parameter' }
    ];
    await store.dispatch(searchArticles('?h=20'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the SEARCH_ARTICLE_SUCCESS action if the request was successful', async () => {
    const mockResponse = { searchResults: [], totalNumberOfPages: 0 };
    mock.onGet('/articles/search?q=andela').reply(200, mockResponse);
    const expectedActions = [
      { type: SEARCH_ARTICLE_REQUEST },
      { type: SEARCH_ARTICLE_SUCCESS, payload: mockResponse }
    ];
    await store.dispatch(searchArticles('?q=andela'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
