import React from 'react';
import { mount } from 'enzyme';
import { CommentForm } from '../../../src/components/comment/CommentForm.jsx';

const mockFn = jest.fn();
const props = {
  slug: 'heyyyyyy',
  auth: {
    isVerified: true
  },
  user: {
    userData: {
      imageUrl: 'www.my-url.com',
      name: 'omenkish',
      username: 'omenkish'
    }
  },
  addComment: mockFn,
  isLoading: true
};

describe('Test CommentForm component', () => {
  const wrapper = mount(<CommentForm {...props} />);
  it('should render empty string for invalid form submission', () => {
    wrapper.find('Form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(wrapper.state('text').length).toBe(0);
  });

  it('should set text on textarea change', () => {
    const value = 'New comment';
    wrapper.setState({ text: 'New comment' });
    wrapper.find('TextareaAutosize').simulate('change', {
      target: { value }
    });
    expect(wrapper.state('text')).toBe(value);
  });

  it('should test isVerified props', () => {
    props.auth.isVerified = false;
    wrapper.setProps({ ...props });
    expect(wrapper.find('img')).toHaveLength(0);
  });
});
