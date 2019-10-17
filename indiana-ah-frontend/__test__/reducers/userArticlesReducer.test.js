import {
  GET_ALL_USER_ARTICLES_REQUEST,
  GET_ALL_USER_ARTICLES_SUCCESS,
  GET_ALL_USER_ARTICLES_FAILURE,
  DELETE_ARTICLE_LOADING,
  DELETE_ARTICLE_SUCCESS
} from '../../src/redux/actions/actionTypes';

import userArticlesReducer from '../../src/redux/reducers/userArticlesReducer';

const initialState = {
  isLoading: false,
  articleData: {
    articles: [
      {
        id: '256c4dff-1d77-4426-8588-0a355c66d4c1',
        articleTitle: 'articleSlugarticleSlugarticle',
        articleBody: '<p><span style="color: rgb(38, 139, 210);">articleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlugarticleSlug</span></p>',
        imageUrl: null,
        numberOfReads: 0,
        slug: 'articleslugarticleslugarticle',
        tags: null,
        userId: 'd6edaa7e-40b1-4727-8116-673fbb0ff23b',
        createdAt: '2019-03-28T07:35:06.552Z',
        updatedAt: '2019-03-28T07:35:06.552Z',
        deletedAt: null,
        author: {
          name: null,
          username: 'biola',
          bio: null,
          imageUrl: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
          id: 'd6edaa7e-40b1-4727-8116-673fbb0ff23b'
        },
        Reactions: [],
        Comments: [],
        likes: 0,
        dislikes: 0
      }
    ],
    totalCount: 1
  },
  error: ''
};
const initialState2 = {
  isLoading: false,
  articleData: {
    articles: [
    ],
    totalCount: 0
  },
  error: ''
};

const responseData = { articles: [{ articleTitle: 'Im the man' }] };
const articleSlug = 'articleslugarticleslugarticle';

describe('user articles reducer test', () => {
  it('should test the initial state', () => {
    expect(userArticlesReducer(initialState, {})).toEqual(initialState);
  });

  it('should test handle the GET_ALL_USER_ARTICLES_REQUEST action', () => {
    expect(
      userArticlesReducer(initialState, { type: GET_ALL_USER_ARTICLES_REQUEST })
    ).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle the GET_ALL_USER_ARTICLES_FAILURE action', () => {
    expect(
      userArticlesReducer(initialState, {
        type: GET_ALL_USER_ARTICLES_FAILURE,
        payload: 'User not found'
      })
    ).toEqual({ ...initialState, error: 'User not found' });
  });

  it('should handle the GET_ALL_USER_ARTICLES_SUCCESS action', () => {
    expect(
      userArticlesReducer(initialState, {
        type: GET_ALL_USER_ARTICLES_SUCCESS,
        payload: responseData
      })
    ).toEqual({ ...initialState, articleData: responseData });
  });
  it('should handle the DELETE_ARTICLE_SUCCESS action', () => {
    expect(
      userArticlesReducer(initialState, {
        type: DELETE_ARTICLE_SUCCESS,
        payload: articleSlug
      })
    ).toEqual({ ...initialState2 });
  });
});
