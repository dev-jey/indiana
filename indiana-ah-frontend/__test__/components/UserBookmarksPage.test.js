import React from 'react';
import { shallow } from 'enzyme';
import TopBarProgress from 'react-topbar-progress-indicator';
import { UserBookmarksPage } from '../../src/components/UserBookmarksPage.jsx';

const props = {
  auth: {
    isLoading: false,
    error: '',
    isAuthenticated: true,
    isVerified: true
  },
  bookmarkedArticles: {
    isLoading: false,
    userBookmarks: [
      {
        id: '866d30bd-a109-436c-9082-9b1a5ba7fc0e',
        articleId: 'ddd4bbca-7d78-4437-abcd-bbedb7e4b949',
        userId: 'd6edaa7e-40b1-4727-8116-673fbb0ff23b',
        deletedAt: null,
        Article: {
          id: 'ddd4bbca-7d78-4437-abcd-bbedb7e4b949',
          articleTitle: 'The Hate You Give Little Infants F*cks Everybody (THUGLIFE)',
          articleBody: '<p>Though the term&nbsp;<em>thug life</em>&nb></p>',
          imageUrl: null,
          numberOfReads: 3,
          slug: 'the-hate-you-give-little-infants-fcks-everybody-thuglife',
          tags: null,
          userId: '09c70160-3cf4-4f8b-b4ef-c9a399270382',
        }
      },
      {
        id: '672a5eb7-9c03-465a-b993-8b5226469fb4',
        articleId: '1aed32c2-c96b-43f0-a632-090824236fc3',
        userId: 'd6edaa7e-40b1-4727-8116-673fbb0ff23b',
        deletedAt: null,
        Article: {
          id: '1aed32c2-c96b-43f0-a632-090824236fc3',
          articleTitle: 'Don\'t Judge Me',
          articleBody: 'There are many varia or non-characteristic words etc.',
          imageUrl: null,
          numberOfReads: 0,
          slug: 'dont-judge-me-8',
          tags: 'tech, Andela, Mission, Opportunity',
          userId: '09c70160-3cf4-4f8b-b4ef-c9a399270382',
        }
      }
    ]
  },
  getAllUsersBookMarkedArticles: jest.fn()
};

describe('User bookmarked articles page test', () => {
  const wrapper = shallow(<UserBookmarksPage {...props} />);
  it('should test that the component was mounted', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('should test for its functionalities', () => {
    wrapper.instance().componentDidMount();
    wrapper.instance().handleClick({ target: {} });
    expect(wrapper.find(TopBarProgress)).toHaveLength(0);
    props.auth.isVerified = false;
    wrapper.setProps({ ...props });
    wrapper.instance().componentDidMount();
    props.bookmarkedArticles.isLoading = true;
    props.bookmarkedArticles.userBookmarks = [
      ...props.bookmarkedArticles.userBookmarks,
      ...props.bookmarkedArticles.userBookmarks,
      ...props.bookmarkedArticles.userBookmarks
    ];
    wrapper.setProps({ ...props });
    expect(wrapper.find('.pagination')).toHaveLength(1);
    props.bookmarkedArticles.userBookmarks = [];
    props.bookmarkedArticles.isLoading = false;
    wrapper.setProps({ ...props });
  });
});
