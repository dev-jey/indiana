import React from 'react';
import { shallow } from 'enzyme';
import CreateArticlePage from '../../src/components/common/CreateArticlePage.jsx';

let wrapper;
const mockFn = jest.fn();

const props = {
  params: { slug: 'when-to-use-refs' }
};

const data = {
  displayImage: 'gfsdjhskfskejrd',
  tags: [],
  articleTitle: 'Goood this is working this is hoog ang workinh as itb should good',
  articleBody: 'Goood this is working this is hoog ang workinh as itb should good',
  modules: {},
  formats: [],
  isLoading: true,
  errors: {}
};

describe('Test CreateArticlePage Component', () => {
  it('Should render Properly', () => {
    wrapper = shallow(
      <CreateArticlePage
        articleTitle={data.articleTitle}
        displayImage={data.displayImage}
        tags={data.tags}
        isLoading={data.isLoading}
        formats={data.formats}
        modules={data.modules}
        errors={data.errors}
        onSubmit={mockFn}
        handleImageDelete={mockFn}
        handleImageUpload={mockFn}
        handleAddition={mockFn}
        handleChange={mockFn}
        onChange={mockFn}
        articleBody={data.articleBody}
        {...props}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('set state and find element', () => {
    expect(wrapper.find('span i').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(9);
    expect(wrapper.find('textarea').length).toEqual(1);
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('form').length).toEqual(1);
    wrapper.find('form').simulate('click');
  });
});
