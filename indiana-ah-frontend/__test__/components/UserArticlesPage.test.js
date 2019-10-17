import React from 'react';
import { shallow } from 'enzyme';
import TopBarProgress from 'react-topbar-progress-indicator';
import { UserArticles } from '../../src/components/UserArticlesPage.jsx';

const prevProps = { location: { search: 'page=1' } };
global.scrollTo = jest.fn();

const props = {
  userData: { username: 'ozonkwo' },
  location: { search: 'page=2' },
  allUserArticles: {
    isLoading: false,
    articleData: {
      articles: [
        {
          slug: 'sjjdjjd',
          articleTitle: 'sjsjjsj',
          articleBody: 'eheeheh',
          tags: 'wjjwjjwjj',
          likes: 0,
          dislikes: 0,
          Comments: [{ id: 'dkdjjdjd' }]
        }
      ],
      totalNumberOfPages: 3
    }
  },
  getAllUserArticles: jest.fn()
};

describe('User articles page test', () => {
  const wrapper = shallow(<UserArticles {...props} />);
  it('should test that the component was mounted', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('should test for its functionalities', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().componentDidUpdate(prevProps);
    props.allUserArticles.articleData = {};
    wrapper.setProps({ ...props });
    props.allUserArticles.articleData = { message: 'You have no articles' };
    wrapper.setProps({
      ...props,
      allUserArticles: { isLoading: true, articleData: { articles: [] } }
    });
    expect(wrapper.find(TopBarProgress)).toHaveLength(1);
    props.allUserArticles.articleData = { message: 'You have no articles' };
    wrapper.setProps({ ...props });
  });
});
