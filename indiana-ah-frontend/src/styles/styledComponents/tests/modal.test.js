import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/common/Modal.jsx';

describe('Custom Input component', () => {
  const props = {
    body: 'This is the body',
    modalIsOpen: false,
    closeModal: jest.fn()
  };
  const wrapper = shallow(<Modal {...props} />);
  it('should create an instance and render correctly', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('div')).toHaveLength(1);
    wrapper.setProps({ ...props });
  });
});
