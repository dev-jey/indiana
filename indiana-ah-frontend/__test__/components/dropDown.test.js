import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../../src/components/Dropdown.jsx';

let wrapper;
const mockFn = jest.fn();
const event = { preventDefault() {}, displayMenu: false };

describe('Test Dropdown Component', () => {
  it('Should render Properly', () => {
    wrapper = shallow(<Dropdown signOutUser={mockFn} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.instance().showDropdownMenu(event);
    wrapper.instance().hideDropdownMenu(mockFn);
  });

  it('set state and find element', () => {
    expect(wrapper.state().displayMenu).toEqual(false);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('i').length).toEqual(1);
    wrapper.setState({ displayMenu: true });
    expect(wrapper.find('Link').length).toEqual(5);
    expect(wrapper.find('ul').length).toEqual(1);
    expect(wrapper.find('li').length).toEqual(5);

    wrapper
      .find('Link')
      .at(3)
      .simulate('click');
  });
});
