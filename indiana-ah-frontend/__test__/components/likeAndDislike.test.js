import React from 'react';
import { shallow } from 'enzyme';
import LikeComponent from '../../src/components/common/LikeComponent';
import DislikeComponent from '../../src/components/common/DislikeComponent';

const handleClick = jest.fn();

describe('<LikeComponent />', () => {
  const likeCount = 2;
  const wrapper = shallow(
    <LikeComponent likeCount={likeCount} color="green" onClick={handleClick} />
  );
  it('should render a like component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('span')).toHaveLength(1);
    wrapper
      .find('span')
      .at(0)
      .simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});

describe('<DislikeComponent />', () => {
  const dislikeCount = 2;
  const wrapper = shallow(
    <DislikeComponent dislikeCount={dislikeCount} color="green" onClick={handleClick} />
  );
  it('should render a dislike component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('span')).toHaveLength(1);
    wrapper
      .find('span')
      .at(0)
      .simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
