import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { apiInstance } from '../../../utils/index';
import articleReducer from '../../reducers/articleReducer';

import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_FAILURE,
  CREATE_ARTICLE_LOADING
} from '../actionTypes';
import createUserArticle from './createArticleAction';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();
const history = { push: jest.fn() };
const wrongArticle = {
  articleTitle: '',
  articleBody: 'This is real',
  tags: 'noyhimg',
  imageUrl: ''
};
const initialState = {
  isLoading: false,
  allArticles: [],
  error: ''
};
const error = {
  message: '"articleTitle" is not allowed to be empty'
};
const rightArticle = {
  article: {
    slug: 'when-to-use-refs',
    articleTitle: 'This is Life, so sweet ggog hjut ',
    articleBody: 'This is real, as in for real  szdykctavszf dsgfasehh ygdfaujvdf ',
    tags: 'know,good,success',
    imageUrl: 'http://images.unsplash.com/photo-1521120413309-42e7eada0334?'
  }
};
const createArticle = {
  article: {
    articleTitle: 'This is Life, so sweet ggog hjut ',
    articleBody: 'This is real, as in for real  szdykctavszf dsgfasehh ygdfaujvdf ',
    tags: 'know,good,success',
    imageUrl: 'http://images.unsplash.com/photo-1521120413309-42e7eada0334?'
  }
};

const match = {
  params: { slug: 'when-to-use-refs' }
};

describe('Action for creating article', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });
  it('should call UPDATE_ARTICLE action', async () => {
    mock.onPut(`/articles/${match.params.slug}/update`).reply(201, rightArticle);

    const expectedAction = [
      { type: CREATE_ARTICLE_LOADING },
      { type: CREATE_ARTICLE, article: rightArticle.article }
    ];

    await store.dispatch(createUserArticle(rightArticle.article, { history, match }));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should call CREATE_ARTICLE action', async () => {
    match.params.slug = '';
    mock.onPost('/articles').reply(201, createArticle);

    const expectedAction = [
      { type: CREATE_ARTICLE_LOADING },
      { type: CREATE_ARTICLE, article: createArticle.article }
    ];

    await store.dispatch(createUserArticle(createArticle.article, { history, match }));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('should call CREATE_ARTICLE_FAILURE action', async () => {
    mock.onPost('/articles').reply(400, error.message);

    const expectedAction = [
      { type: CREATE_ARTICLE_LOADING },
      { type: CREATE_ARTICLE_FAILURE, error: error.message }
    ];

    await store.dispatch(createUserArticle(wrongArticle, { history, match }));
    expect(store.getActions()).toEqual(expectedAction);
  });
  it('should call CREATE_ARTICLE_LOADING action', () => {
    expect(
      articleReducer(initialState, {
        type: CREATE_ARTICLE_LOADING
      })
    ).toEqual({ ...initialState, isLoading: true });
    expect(
      articleReducer(initialState, {
        type: CREATE_ARTICLE_FAILURE
      })
    ).toEqual({ ...initialState, isLoading: false });
  });
});
