import React from 'react';
import { shallow } from 'enzyme';
import EditHistorytitem from '../../../src/components/comment/EditHistoryItem.jsx';
import comments from '../../../__fixtures__/comments';

describe('Test CommentItem component', () => {
  const wrapper = shallow(<EditHistorytitem comment={comments[0]} />);
  it('It should render the comment history item component', () => {
    expect(wrapper.find('div')).toHaveLength(5);
  });
});
