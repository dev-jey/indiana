import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { ResetFormContainer } from '../../src/components/ResetFormContainer.jsx';


const props = {
  auth: {
    isLoading: false,
    error: '',
    sendResetLink: ''
  }
};

const props2 = {
  auth: {
    isLoading: true,
    error: '',
    sendResetLink: ''
  }
};

describe('Reset Form', () => {
  it('should match snapshot', () => {
    const tree = renderer.create(<ResetFormContainer {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('test the login container form', () => {
  const sendResetLink = jest.fn();
  const handleChange = jest.fn();
  const displayForm = jest.fn();
  it('should simulate the handleSubmit', () => {
    const wrapper = mount(
      <ResetFormContainer
        {...props}
        sendResetLink={sendResetLink}
        displayForm={displayForm}
        handleChange={handleChange}
      />
    );
    wrapper.find('form').simulate('submit');
    const input1 = wrapper.find('input').at(0);
    input1.simulate('change', { target: { value: 'fafa@gmail.com' } });
    expect(sendResetLink).toHaveBeenCalled();
  });
  it('should simulate the loading spinner', () => {
    const wrapper = mount(
      <ResetFormContainer
        {...props2}
        sendResetLink={sendResetLink}
        displayForm={displayForm}
        handleChange={handleChange}
      />
    );
    const span = wrapper.find('span').at(0);
    expect(span).toBeDefined();
  });
});
