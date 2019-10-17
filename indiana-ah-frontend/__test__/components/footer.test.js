import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Footer from '../../src/components/common/footer.jsx';

describe('Custom Footer component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders a footer', () => {
    const footer = shallow(<Footer />);
    expect(footer.find('.footer')).toBeDefined();
    expect(footer.find('.app-logo')).toBeDefined();
    const h2 = footer.find('h2');
    expect(h2.length).toEqual(3);
  });
});
