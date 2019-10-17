import React from 'react';
import { shallow } from 'enzyme';
import Badge from 'react-bootstrap/Badge';
import BadgeComponent from '../../src/components/common/BadgeComponent';

describe('<BadgeComponent />', () => {
  const wrapper = shallow(<BadgeComponent eachTagDetail='abiola' />);
  it('should render a badge component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(Badge)).toHaveLength(1);
  });
});
