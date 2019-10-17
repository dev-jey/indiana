import React from 'react';
import { shallow } from 'enzyme';
import { CommentFeed } from '../../../src/components/comment/CommentFeed.jsx';
import comments from '../../../__fixtures__/comments';

describe('<CommentItemComponent />', () => {
  const wrapper = shallow(<CommentFeed comments={comments} />);
  it('should render a CommentItem component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});

describe('<CommentItemComponent /> with empty comment', () => {
  const wrapper = shallow(<CommentFeed comments={[]} />);
  it('should render a CommentItem component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
