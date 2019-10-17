import React from 'react';
import { shallow } from 'enzyme';
import EditHistoryfeed from '../../../src/components/comment/EditHistoryFeed.jsx';
import comments from '../../../__fixtures__/comments';

describe('<CommentEditHistoryComponent />', () => {
  const wrapper = shallow(<EditHistoryfeed editHistory={comments} />);
  it('should render a CommentItem component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
