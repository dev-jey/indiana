import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TimerComponent from '../../src/components/common/TimerComponent';

describe('<BadgeComponent />', () => {
  const wrapper = shallow(<TimerComponent timeCount={'2 days ago'} />);
  it('should render a timer component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('sub')).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = renderer.create(<TimerComponent timeCount={'2 days ago'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
