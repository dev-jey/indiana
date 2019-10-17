import React from 'react';
import { shallow } from 'enzyme';
import { UserVerificationPage } from '../../src/components/UserVerificationPage.jsx';

const verifyUser = jest.fn();
const history = { push: jest.fn() };

describe('User verification page test', () => {
  const wrapper = shallow(
    <UserVerificationPage verifyUser={verifyUser} history={history} />
  );
  it('should check that the component rendered correctly', () => {
    expect(wrapper.length).toEqual(1);
    wrapper.instance().componentDidMount();
  });
});
