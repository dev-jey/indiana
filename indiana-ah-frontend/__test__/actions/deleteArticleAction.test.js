import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { apiInstance } from '../../src/utils';
import { deleteArticles } from '../../src/redux/actions/articleActions/articleActions';
import {
  DELETE_ARTICLE_LOADING,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE
} from '../../src/redux/actions/actionTypes';

jest.mock('react-toastify');
const mock = new MockAdapter(apiInstance);
const mockStore = configureStore([thunk]);
const articleSlug = 'djherhgvcfryejhkfcurfhjerg';
const store = mockStore({});

const mockData2 = { message: 'Article successfully deleted' };

describe('deleting  all parcels action', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('handles deleting an aticle successfully', async () => {
    mock.onDelete(`/articles/${articleSlug}`).reply(200, mockData2);
    const expectedActions = [
      {
        type: DELETE_ARTICLE_LOADING
      },
      {
        type: DELETE_ARTICLE_SUCCESS,
        payload: articleSlug
      }
    ];
    await store.dispatch(deleteArticles(articleSlug));
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
  });

  it('handles deleting an aticle unsuccessfully', async () => {
    mock
      .onDelete(`/articles/${articleSlug}`)
      .reply(500, { message: 'Internal server error' });
    const expectedActions = [
      {
        type: DELETE_ARTICLE_LOADING
      },
      {
        type: DELETE_ARTICLE_FAILURE,
        payload: []
      }
    ];
    await store.dispatch(deleteArticles('dsdsd'));
    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
  });
});
