import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { apiInstance } from '../../src/utils';

import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_COMMENT,
  DISLIKE_COMMENT
} from '../../src/redux/actions/actionTypes';
import { reactToComment, reactToArticle } from '../../src/redux/actions/reactionActions';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Reaction actions test', () => {
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should create the LIKE_ARTICLE action if the reaction type is "like"', async () => {
    const expectedActions = [{ type: LIKE_ARTICLE }];
    store.dispatch(reactToArticle('when-i-get-older', 'like'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the DISLIKE_ARTICLE action if the reaction type is "dislike"', async () => {
    const expectedActions = [{ type: DISLIKE_ARTICLE }];
    store.dispatch(reactToArticle('when-i-get-older', 'dislike'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the LIKE_COMMENT action if the reaction type is "like"', async () => {
    const expectedActions = [{ type: LIKE_COMMENT, payload: '5' }];
    store.dispatch(reactToComment('5', 'like'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the DISLIKE_COMMENT action if the reaction type is "dislike"', async () => {
    const expectedActions = [{ type: DISLIKE_COMMENT, payload: '5' }];
    store.dispatch(reactToComment('5', 'dislike'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
