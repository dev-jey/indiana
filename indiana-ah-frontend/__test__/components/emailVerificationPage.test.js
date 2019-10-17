import React from 'react';
import { shallow } from 'enzyme';
import { EmailVerificationPage } from '../../src/components/EmailVerificationPage.jsx';

describe('<EmailVerificationPage  />', () => {
  const wrapper = shallow(<EmailVerificationPage />);
  it('should render a comment component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('p').length).toEqual(2);
    expect(wrapper.find('a')).toHaveLength(1);
    wrapper.find('a').simulate('click');
  });
});
