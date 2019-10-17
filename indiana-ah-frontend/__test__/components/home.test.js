import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../src/components/Home.jsx';
import PersonalisedView from '../../src/components/personalised/Index.jsx';
import Index from '../../src/components/IndexPage.jsx';

describe('<Home Component />', () => {
  const wrapper = shallow(<Home auth={{ isAuthenticated: false }} />);
  it('should render a like component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(<Index />)).toHaveLength(0);
    wrapper.setProps({ auth: { isAuthenticated: true } });
    expect(wrapper.find(<PersonalisedView />)).toHaveLength(0);
  });
});
