import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import initialState from '../../__fixtures__/indexPage';
import CardComponent from '../../src/components/common/CardComponent';
import Personalised, {
  PersonalisedViewComponent
} from '../../src/components/personalised/Index.jsx';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);
let wrapper;

const article = {
  id: '29016be3-8c72-4834-8f8f-8dd7d8aaee6e',
  articleTitle: 'How I got into Andela',
  articleBody: `We practice modular programming- this is a software design
    technique that emphasizes separating the functionality of a program
    into independent, interchangeable modules, such that each contains everything
    necessary to execute only one aspect.`,
  imageUrl: `http://res.cloudinary.com/indiana/image/upload/v1552478343/images/
    rrnuirxby8no5icfn3uo.jpg`,
  numberOfReads: 0,
  slug: 'how-i-got-into-andela-7',
  tags: null,
  userId: '5009125c-e944-449e-8bac-644d7b1e21bc',
  createdAt: '2019-03-13T11:59:03.627Z',
  updatedAt: '2019-03-13T11:59:03.627Z',
  deletedAt: null,
  author: {
    name: null,
    username: 'primuse',
    bio: null,
    imageUrl: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
  },
  likes: 0,
  dislikes: 0
};

const userBookmarks = [{ Article: article }];

const props = {
  auth: { isVerified: false },
  articles: { isLoading: false, allArticles: [article] },
  bookmarkedArticles: { isLoading: false, userBookmarks },
  getAllArticles: jest.fn(),
  getAllUsersBookMarkedArticles: jest.fn()
};

describe('<PersonalisedViewComponent articles={initialState} />', () => {
  const component = shallow(<PersonalisedViewComponent {...props} />);
  beforeEach(() => {
    wrapper = shallow(<Provider store={store}> <Personalised /> </Provider>);
  });
  it('should render a Personalised ViewComponent if user is logged in', () => {
    expect(wrapper.find('.personalised-container')).toBeDefined();
    expect(
      wrapper.find(
        <CardComponent key={0}
        img={article.imageUrl}
        color={article.color}
        commentCount={0}
        slug={article.slug}
        likeCount={article.likes}
        dislikeCount={article.dislikes}
        title={`${article.articleTitle.slice(0, 30)}`}
        text={`${article.articleBody.slice(0, 160)}...`}
        />
      )
    ).toBeDefined();
  });
  it('should render different components based on props received', () => {
    component.setProps({ articles: { isLoading: true } });
    component.setProps({ bookmarkedArticles: { isLoading: true } });
    component.setProps({ bookmarkedArticles: { isLoading: false, userBookmarks: [] } });
    component.setProps({ articles: { isLoading: false, allArticles: [] } });
    component.setProps({ auth: { isVerified: true } });
    component.instance().componentDidMount();
    component.setProps({ bookmarkedArticles: props.bookmarkedArticles });
  });
});
