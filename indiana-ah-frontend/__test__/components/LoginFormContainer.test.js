import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { LoginFormContainer } from '../../src/components/LoginFormContainer.jsx';


const props = {
  auth: { isLoading: false },
  error: ''
};

describe('Login Form', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<LoginFormContainer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('test the login container form', () => {
  let wrapper;
  let loginWithEmail;
  const displayForm = jest.fn();
  beforeEach(() => {
    loginWithEmail = jest.fn();
    wrapper = mount(
      <LoginFormContainer
        {...props}
        loginWithEmail={loginWithEmail}
        displayForm={displayForm}
      />
    );
  });
  it('should match snap shot', () => {
    const tree = renderer.create(<LoginFormContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should simulate the handleSubmit', () => {
    wrapper.find('form').simulate('submit');
    const input1 = wrapper.find('input').at(0);
    const input2 = wrapper.find('input').at(1);
    input1.simulate('change', { target: { value: 'fafa@gmail.com' } });
    input2.simulate('change', { target: { value: 'fafasecret22' } });
    expect(loginWithEmail).toHaveBeenCalled();
  });
  it('should simulate the failure of handleSubmit', () => {
    props.auth.isLoading = true;
    wrapper.find('form').simulate('submit');
    const input1 = wrapper.find('input').at(0);
    const input2 = wrapper.find('input').at(1);
    wrapper.setState({ error: 'error logging in' });
    input1.simulate('change', { target: { value: 'fafa@gmail.com' } });
    input2.simulate('change', { target: { value: 'fafasecret33' } });
    expect(wrapper.state('error')).toEqual('error logging in');
  });
  it('should simulate clicking the link that opens the register form', () => {
    const aTag = wrapper.find('a').at(3);
    aTag.simulate('click');
    expect(displayForm).toHaveBeenCalled();
  });
  it('should simulate clicking the link that opens the reset password form', () => {
    const aTag = wrapper.find('a').at(4);
    aTag.simulate('click');
    expect(displayForm).toHaveBeenCalled();
  });
});
