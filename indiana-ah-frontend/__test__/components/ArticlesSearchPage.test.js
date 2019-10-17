import React from 'react';
import { shallow } from 'enzyme';
import TopBarProgress from 'react-topbar-progress-indicator';
import {
  ArticlesSearchPage,
  mapStateToProps
} from '../../src/components/ArticlesSearchResultsPage.jsx';
import SearchResultsCard from '../../src/components/common/SearchResultsCard.jsx';

const props = {
  searchArticles: jest.fn(),
  location: { search: '?q=ezenwa' },
  articlesSearchResults: {
    searchData: {
      searchResults: [{ slug: 'i-am-the-man', articleTitle: 'i am the man' }]
    },
    error: '',
    isLoading: true
  }
};

const prevProps = { ...props, location: { search: '?q=tiku' } };

describe('Articles search test', () => {
  const wrapper = shallow(<ArticlesSearchPage {...props} />);
  it('should test that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should test for its functionalities', () => {
    wrapper.instance().componentDidUpdate(prevProps);
    wrapper.setProps({ location: { search: '?author=ozone' } });
    expect(wrapper.find(SearchResultsCard)).toHaveLength(1);
    expect(wrapper.find('Footer')).toHaveLength(1);
    wrapper.setProps({
      ...props,
      articlesSearchResults: { searchData: {} }
    });
    expect(wrapper.find(TopBarProgress)).toHaveLength(1);
    wrapper.setProps({
      ...props,
      isLoading: false,
      articlesSearchResults: { searchData: { searchResults: [] } }
    });
    wrapper.setProps({
      ...props,
      articlesSearchResults: { error: 'invalid search parameter' }
    });
    expect(mapStateToProps({ articlesSearchResults: {} })).toEqual({
      articlesSearchResults: {}
    });
  });
});
