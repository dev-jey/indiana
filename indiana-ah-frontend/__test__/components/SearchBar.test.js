import React from 'react';
import { mount } from 'enzyme';
import { SearchBar } from '../../src/components/common/SearchBar.jsx';

describe('search bar test', () => {
  const component = mount(<SearchBar history={{ push: jest.fn() }} />);
  it('should test that the component rendered', () => {
    expect(component).toHaveLength(1);
  });
  it('should test for its functionalities', () => {
    component
      .find('input')
      .at(0)
      .simulate('change', { target: { name: 'searchValue', value: 'andela' } });
    component
      .find('select')
      .at(0)
      .simulate('change', { target: { name: 'filterOption', value: 'author' } });
    expect(component.state()).toEqual({ searchValue: 'andela', filterOption: 'author' });
    component.instance().handleSubmit({ preventDefault: jest.fn() });
    component.setState({ filterOption: '', searchValue: '' });
    component.instance().handleSubmit({ preventDefault: jest.fn() });
  });
});
