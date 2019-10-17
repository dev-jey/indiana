import thunk from 'redux-thunk';
import { toast } from 'react-toastify';
import configureMockStore from 'redux-mock-store';
import { sendHttpRequest } from '../../src/utils';
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../../src/redux/actions/actionTypes';
import addBookmark from '../../src/redux/actions/bookmarkActions';

jest.mock('../../src/utils');
jest.mock('react-toastify');
const mockStore = configureMockStore([thunk]);

const singleArticle = {
  id: 1,
  articleId: 1,
  userId: 1,
  Article: {
    slug: 'slug',
    articleBody: 'article body',
    imageUrl: 'article-url',
    articleTitle: 'article title'
  }
};
const store = mockStore({ singleArticle });
const id = 'f2d7da57-28c4-444b-840c-d9a78afe00cd';
const article = {
  payload: {
    bookmark: true,
    id,
    Article: singleArticle.Article
  }
};

describe('Auth action creators test', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const getError = status => ({
    response: {
      status,
      data: {
        message: 'hello'
      }
    }
  });

  it('should create the ADD_BOOKMARK action', async () => {
    sendHttpRequest.mockResolvedValue({
      bookmark: article.payload,
      message: 'Article bookmarked successfully'
    });
    const expectedActions = [
      { type: ADD_BOOKMARK, payload: article.payload },
    ];

    await store.dispatch(addBookmark(id));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });
  it('should create the REMOVE_BOOKMARK action', async () => {
    sendHttpRequest.mockResolvedValue({
      message: 'Article bookmarked successfully'
    });
    const expectedActions = [
      { type: REMOVE_BOOKMARK, id },
    ];

    await store.dispatch(addBookmark(id));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('should create the REMOVE_BOOKMARK action', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(addBookmark(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the REMOVE_BOOKMARK action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(addBookmark(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the REMOVE_BOOKMARK action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(addBookmark(id));
    expect(toast.error).toHaveBeenCalledWith(`Cannot bookmark this article at the moment. 
          Please try again later`);
  });
});
