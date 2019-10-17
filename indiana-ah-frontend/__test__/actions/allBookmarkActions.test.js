import React from 'react';
import thunk from 'redux-thunk';
import { toast } from 'react-toastify';
import configureMockStore from 'redux-mock-store';
import { sendHttpRequest } from '../../src/utils';
import {
  GET_ALL_BOOKMARKS,
  GET_ALL_BOOKMARKS_LOADING
} from '../../src/redux/actions/actionTypes';
import { getAllUsersBookMarkedArticles } from '../../src/redux/actions/articleActions/articleActions';


jest.mock('../../src/utils');
jest.mock('react-toastify');
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Bookmark action creators test', () => {
  beforeEach(() => {
    store.clearActions();
  });

  const article = {
    payload: [
      {
        id: 'bf531beb-5814-446c-a0b7-40e00a9912e0',
        articleId: 'f2d7da57-28c4-444b-840c-d9a78afe00cd',
        userId: '0113f2ed-8e4f-4fab-9431-2cc4f8554f0d',
        createdAt: '2019-03-20T12:26:51.156Z',
        updatedAt: '2019-03-20T12:26:51.156Z',
        deletedAt: null,
        Article: {
          id: 'f2d7da57-28c4-444b-840c-d9a78afe00cd',
          articleTitle: 'How I met your mother2',
          articleBody: 'This is the story of how I met your mother part 2. How I met your mother, How I met your mother. End of story',
          imageUrl: 'https://i.kinja-img.com/gawker-media/image/upload/s--94JUxrpM--/c_scale,f_auto,fl_progressive,q_80,w_800/zjeabjityzca61on7izk.jpg',
          numberOfReads: 0,
          slug: 'how-i-met-your-mother2-1',
          tags: null,
          userId: '551e0214-9d2f-4602-be8a-71284a2aec33',
          createdAt: '2019-03-20T12:15:07.167Z',
          updatedAt: '2019-03-20T12:15:07.167Z',
          deletedAt: null
        }
      },
      {
        id: '1d2eb29e-0a58-4927-814c-9b0e64c5c0fd',
        articleId: '36d9ecea-d005-476c-b1a5-ab64600236fe',
        userId: '0113f2ed-8e4f-4fab-9431-2cc4f8554f0d',
        createdAt: '2019-03-20T14:32:41.604Z',
        updatedAt: '2019-03-20T14:32:41.604Z',
        deletedAt: null,
        Article: {
          id: '36d9ecea-d005-476c-b1a5-ab64600236fe',
          articleTitle: 'Deploying node modules -Dozie',
          articleBody: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
          imageUrl: 'https://avatars0.githubusercontent.com/u/38977569?s=400&v=4',
          numberOfReads: 0,
          slug: 'deploying-node-modules-dozie',
          tags: 'deploy,docker, isVerified',
          userId: '0113f2ed-8e4f-4fab-9431-2cc4f8554f0d',
          createdAt: '2019-03-20T12:12:32.319Z',
          updatedAt: '2019-03-20T12:12:32.319Z',
          deletedAt: null
        }
      },
    ]
  };

  const getError = status => ({
    response: {
      status,
      data: {
        message: 'hello'
      }
    }
  });

  it('should create the GET_ALL_BOOKMARKS action', async () => {
    sendHttpRequest.mockResolvedValue({
      message: 'Article bookmarked successfully',
      userBookmarks: article.payload,
      bookmarkCount: article.payload.length
    });
    const expectedActions = [
      { type: GET_ALL_BOOKMARKS_LOADING },
    ];

    const expectedActions2 = [
      { type: GET_ALL_BOOKMARKS, payload: article.payload },
    ];

    await store.dispatch(getAllUsersBookMarkedArticles());
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
    expect(store.getActions()[1]).toEqual(expectedActions2[0]);
  });

  it('should create the GET_ALL_BOOKMARKS action when user has no bookmarked article', async () => {
    sendHttpRequest.mockResolvedValue({
      message: 'You do not have any bookmarked article',
    });
    const expectedActions = [
      { type: GET_ALL_BOOKMARKS_LOADING },
      { type: GET_ALL_BOOKMARKS, payload: [] }
    ];

    await store.dispatch(getAllUsersBookMarkedArticles());
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });
  it('should show an error with toast', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(getAllUsersBookMarkedArticles());
    expect(toast.error).toHaveBeenCalledWith(<div>Request was not successful at the moment. Try again later</div>);
  });
});
