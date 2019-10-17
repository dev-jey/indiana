import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Button from '../Button.jsx';

describe('testing the button element', () => {
  it('should mount custom button', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background', '#fff');
  });

  it('should apply styles according to passed props', () => {
    const tree = renderer.create(<Button danger inlineButton />).toJSON();
    expect(tree).toHaveStyleRule('color', '#fff');
    expect(tree).toHaveStyleRule(
      'border',
      expect.stringContaining('0.2rem solid #CD160B')
    );
    expect(tree).toHaveStyleRule('display', expect.stringContaining('inline-block'));
  });
});
