import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../src/components/common/Pagination';

const onPageClick = jest.fn();

describe('Pagination test', () => {
  const wrapper = shallow(
    <Pagination
      currentPage={1}
      numberOfPages={10}
      onPageClick={onPageClick}
      query={'limit=4'}
    />
  );
  it('should test that the component rendered', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div')).toHaveLength(3);
  });

  it('should test for its functionalities', () => {
    expect(wrapper.find('.caret-left-arrow-disabled')).toHaveLength(1);
    expect(wrapper.find('.caret-right-arrow-disabled')).toHaveLength(0);
    wrapper.setProps({ currentPage: 4 });
    expect(wrapper.find('.caret-left-arrow-disabled')).toHaveLength(0);
    wrapper.setProps({ currentPage: 10 });
    expect(wrapper.find('.caret-right-arrow-disabled')).toHaveLength(1);
    wrapper.setProps({ numberOfPages: 4 });
    wrapper.setProps({ currentPage: 1 });
    expect(wrapper.find('.caret-right-arrow-disabled')).toHaveLength(0);
    wrapper.setProps({ query: '' });
  });
});
