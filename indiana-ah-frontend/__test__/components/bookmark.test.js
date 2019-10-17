import React from 'react';
import { shallow } from 'enzyme';
import BookmarkComponent from '../../src/components/common/BookmarkComponent';

describe('<LikeComponent />', () => {
  const color = 'green';
  const wrapper = shallow(<BookmarkComponent color={color} />);
  it('should render a like component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('svg')).toHaveLength(1);
  });
});
