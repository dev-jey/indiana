import React from 'react';
import { shallow } from 'enzyme';
import SearchResultsCard from '../../src/components/common/SearchResultsCard.jsx';

const article = {
  article: {
    slug: 'knowledge-at',
    articleTitle: 'woking  working working',
    articleBody: 'woking  working working',
    imageUrl: 'gfhbsdkjgvasj gfskjher',
    author: 'EfeAgare',
    Comments: 'likes and dislikes',
    likes: 12,
    dislikes: 3
  }
};

describe('<SideNav/>', () => {
  it('should render the SideNav component with 3 NavLinks', () => {
    const wrapper = shallow(<SearchResultsCard article={article.article} />);
    expect(wrapper.find('NavLink')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(8);
  });
});
