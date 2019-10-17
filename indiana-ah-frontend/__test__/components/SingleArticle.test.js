import React from 'react';
import { shallow } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { SingleArticle } from '../../src/components/containers/SingleArticle.jsx';
import reducer from '../../src/redux/reducers/getSingleArticleReducer';
import articleAction from
  '../../src/redux/actions/getSingleArticleActions/getSingleArticleActions';
import { apiInstance } from '../../src/utils/index';
import {
  GET_SINGLE_ARTICLE_LOADING,
  GET_SINGLE_ARTICLE_SUCCESS,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE
} from '../../src/redux/actions/actionTypes';
import comments from '../../__fixtures__/comments';

const mock = new MockAdapter(apiInstance);
const mockStore = configureMockStore([thunk]);

const auth = {
  isVerified: true
};
const user = {
  userData: {
    username: 'chuks',
    id: 'dkdkkdkkdk'
  }
};
const store = mockStore({ user });
const bookmarkedArticles = {
  userBookmarks: [
    {
      article: {
        id: 1,
        articleId: 1,
        userId: 1
      }
    }
  ]
};
const userFollow = {
  isUsersFollowedLoading: false,
  UsersFollowed: 2
};
const article = {
  article: {
    articleBody: 'test article',
    articleTitle: '',
    tags: '',
    slug: 'i-am-so-good',
    imageUrl: '',
    Comments: 5,
    likes: 6,
    dislikes: 3,
    likedByMe: false,
    dislikedByMe: true,
    Reactions: [
      { userId: 'dldlld', reactionType: 'like' },
      { userId: 'dkdkkdkkdk', reactionType: 'dislike' }
    ],
    author: {
      username: 'jane'
    },
    createdAt: '1969-12-31T23:59:50.000Z'
  },
  timeToRead: '1 min read'
};
const expectedResponseData = {
  article: {},
  timeToRead: '1 min read'
};
const articles = {};
const history = { push: jest.fn() };
const mockFn = jest.fn();
const match = {
  params: {
    slug: 'i-love-coding'
  }
};
describe('<SingleArticle/>', () => {
  it('should render the SingleArticle component with 1 div', () => {
    const wrapper = shallow(
      <SingleArticle
        singleArticle={article}
        userFollow={userFollow}
        user={user}
        auth={auth}
        bookmarkedArticles={bookmarkedArticles}
        comments={comments}
        match={match}
        getSingleArticle={mockFn}
        getAllUsersBookMarkedArticles={mockFn}
        getArticleComments={mockFn}
        getAllUsersFollowed={mockFn}
        addBookmark={mockFn}
        followOrUnfollow={mockFn}
        history={history}
        reactToArticle={jest.fn(article.slug, 'login')}
      />
    );
    expect(wrapper.find('div.carousel-spinner').length).toEqual(0);
    article.article.tags = 'hey, hoo, hi';
    article.article.imageUrl = 'http://i3i3i3ii3je';
    article.article.articleBody = 'I am going home';
    wrapper.setProps({ article });
    expect(wrapper.find('div.carousel-spinner').length).toEqual(0);
    wrapper.find('.fa-bookmark').simulate('click');
    article.article.id = 2;
    wrapper.setProps({ ...article });
    wrapper.find('.fa-bookmark').simulate('click');
    wrapper.setProps({ auth: { isVerified: false } });

    wrapper.setProps({
      singleArticle: {
        article: { ...article.article, likedByMe: true, dislikedByMe: false }
      }
    });
    wrapper.instance().openModal();
    wrapper.instance().closeModal();
    wrapper.instance().displayForm('like');
    auth.isVerified = false;
    wrapper.setProps({ ...auth });
  });
});

describe('getSingleArticles reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isLoading: false,
      article: {}
    });
  });

  it('should return loading', () => {
    const successAction = {
      type: GET_SINGLE_ARTICLE_LOADING
    };
    expect(reducer({}, successAction)).toEqual({ isLoading: true, article: {} });
  });

  it('should return all articles', () => {
    const successAction = {
      type: GET_SINGLE_ARTICLE_SUCCESS,
      payload: articles
    };
    expect(reducer({}, successAction)).toEqual({ isLoading: false, article: articles });
  });

  it('should handle the LIKE_ARTICLE action', () => {
    const action = { type: LIKE_ARTICLE };
    expect(reducer({ isLoading: false, article }, action)).toEqual({
      isLoading: false,
      article
    });
  });

  it('should handle the DISLIKE_ARTICLE action', () => {
    const action = { type: DISLIKE_ARTICLE };
    expect(reducer({ isLoading: false, article }, action)).toEqual({
      isLoading: false,
      article
    });
  });
});

describe('getSingleArticleActions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });
  it('should create the GET_SINGLE_ARTICLE_SUCCESS action if the api request was successful', async () => {
    mock.onGet('/articles/i-love-coding').reply(200, article);
    const { timeToRead } = expectedResponseData;
    article.article.timeToRead = timeToRead;

    const expectedActions = [
      { type: GET_SINGLE_ARTICLE_LOADING },
      { type: GET_SINGLE_ARTICLE_SUCCESS, payload: article.article }
    ];

    await store.dispatch(articleAction('i-love-coding', history));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create the GET_SINGLE_ARTICLE_SUCCESS action if the api request was successful', async () => {
    article.Reactions = [
      { userId: 'dldlld', reactionType: 'like' },
      { userId: 'dkdkkdkkdk', reactionType: 'dislike' }
    ];
    mock.onGet('/articles/i-love-coding').reply(200, article);
    const { timeToRead } = expectedResponseData;
    article.timeToRead = timeToRead;

    const expectedActions = [
      { type: GET_SINGLE_ARTICLE_LOADING },
      { type: GET_SINGLE_ARTICLE_SUCCESS, payload: article.article }
    ];

    await store.dispatch(articleAction('i-love-coding', history));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should redirect to a not-found page if the api request was not successful', async () => {
    mock.onGet('/articles/i-love-coding').reply(404);

    const expectedActions = [{ type: GET_SINGLE_ARTICLE_LOADING }];

    await store.dispatch(articleAction('i-love-coding', history));
    expect(store.getActions()).toEqual(expectedActions);
    expect(history.push).toHaveBeenCalled();
  });

  it('should redirect to the home page if there is any other kind of error', async () => {
    mock.onGet('/articles/i-love-coding').reply(503);

    const expectedActions = [{ type: GET_SINGLE_ARTICLE_LOADING }];

    await store.dispatch(articleAction('i-love-coding', history));
    expect(store.getActions()).toEqual(expectedActions);
    expect(history.push).toHaveBeenCalled();
  });
});
