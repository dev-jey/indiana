import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import IndexForm from '../../src/components/forms/indexForm.jsx';
import reducer from '../../src/redux/reducers/articleReducer';
import ConnectedIndexPage, { IndexPage } from '../../src/components/IndexPage.jsx';
import IndexCarousel from '../../src/components/carousels/indexCarousel.jsx';
import initialState from '../../__fixtures__/indexPage';
import {
  GET_ALL_ARTICLES,
  NO_ARTICLES,
  GET_ALL_ARTICLES_LOADING,
  GET_ALL_ARTICLES_ERROR,
  CREATE_ARTICLE
} from '../../src/redux/actions/actionTypes';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);
const onChange = jest.fn();
const getAllArticles = jest.fn();
let connectedIndexPage;
let articles;
const article = [
  {
    articleBody: 'how-i-got-into-andela',
    slug: 'how-i-got-into-andela',
    articleTitle: 'how-i-got-into-andela'
  }
];

describe('Index page', () => {
  beforeEach(() => {
    connectedIndexPage = shallow(
      <Provider store={store}>
        <ConnectedIndexPage />
      </Provider>
    );
  });

  const wrapper = shallow(
    <IndexPage
      articles={{ allArticles: [], isLoading: false }}
      getAllArticles={getAllArticles}
      auth={{ isLoading: true }}
    />
  );

  it('renders the Index Page', () => {
    expect(connectedIndexPage.find('.container')).toBeDefined();
    expect(connectedIndexPage.find(<IndexCarousel />)).toBeDefined();
  });
  it('passes articles from state', () => {
    const props = connectedIndexPage.props().value.storeState;
    expect(props.articles).toEqual(initialState.articles);
  });
  it('has modal functionalities', () => {
    wrapper.instance().openModal();
    wrapper.instance().closeModal();
    wrapper.instance().displayForm('login');
    expect(wrapper.state().modalContent).toEqual('login');
    wrapper.instance().displayForm('register');
    expect(wrapper.state().modalContent).toEqual('register');
    wrapper.instance().displayForm('reset');
    expect(wrapper.state().modalContent).toEqual('reset');
  });
});

describe('articles reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      allArticles: [],
      error: false,
      isLoading: false
    });
  });
  it('should return all articles', () => {
    const successAction = {
      type: GET_ALL_ARTICLES,
      payload: articles
    };
    expect(reducer({}, successAction)).toEqual({
      allArticles: articles,
      isLoading: false,
      error: false
    });
  });
  it('should return loading', () => {
    const successAction = {
      type: GET_ALL_ARTICLES_LOADING
    };
    expect(reducer({}, successAction)).toEqual({ isLoading: true });
  });
  it('should return no articles', () => {
    const successAction = {
      type: NO_ARTICLES,
      payload: []
    };
    expect(reducer({}, successAction)).toEqual({
      allArticles: [],
      isLoading: false,
      error: false
    });
  });
  it('should handle error in fetching articles', () => {
    const failureAction = {
      type: GET_ALL_ARTICLES_ERROR,
      isLoading: false,
      error: true
    };
    expect(reducer({}, failureAction)).toEqual({ isLoading: false, error: true });
  });
  it('should return no articles', () => {
    const successAction = {
      type: CREATE_ARTICLE,
      article: []
    };
    expect(reducer({}, successAction)).toEqual({ allArticles: [], isLoading: false });
  });
});

describe('Index subscribe form', () => {
  it('should change state', () => {
    const indexForm = mount(<IndexForm handleChange={onChange} />);
    const input = indexForm.find('input').at(0);
    input.instance().value = 'yinks@gmail.com';
    input.simulate('change');
    expect(indexForm.state().email).toEqual('yinks@gmail.com');
  });
});
describe('Index carousel', () => {
  it('should change state', () => {
    const tree = shallow(<IndexCarousel articles={article} />);
    expect(tree.exists()).toBe(true);
  });
});
