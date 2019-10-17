import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import InputField from '../../../components/common/input/InputComponent.jsx';
import { Input, TextArea } from '../../../components/common/input/Input.jsx';

describe('Custom Input component', () => {
  const props = {
    type: 'email',
    id: 'email',
    value: 'Odinks',
    placeholder: 'Enter your email',
    handleChange: () => 2
  };
  const wrapper = shallow(<InputField {...props} />);
  it('should create an instance and render correctly', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('div')).toHaveLength(1);
    wrapper.setProps({ ...props });
  });
});

describe('Custom Input styled-component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders dynamic width', () => {
    const tree = renderer.create(<Input inputWidth="20rem" />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', expect.stringContaining('20rem'));
  });
});
describe('Custom Text Area styled-component', () => {
  it('renders dynamic width', () => {
    const tree = renderer.create(<TextArea inputWidth="20rem" />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', expect.stringContaining('20rem'));
  });
  it('renders dynamic width', () => {
    const tree = renderer.create(<TextArea />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('width', expect.stringContaining('37.1rem'));
  });
});
