import React from 'react';
import { shallow } from 'enzyme';
import SideNav from '../../src/components/SideNav.jsx';

describe('<SideNav/>', () => {
  it('should render the SideNav component with 3 NavLinks', () => {
    const wrapper = shallow(<SideNav/>);
    expect(wrapper.find('NavLink')).toHaveLength(3);
  });
});
