import React from 'react';
import { shallow } from 'enzyme';
import { CreateArticle, mapStateToProps } from '../../src/components/CreateArticle.jsx';

const FormDataMock = () => {
  this.append = jest.fn();
};
global.formData = FormDataMock;
let wrapper;
const mockFn = jest.fn();
const event = { preventDefault() {}, target: { files: [] } };
const initialState = {
  isLoading: false,
  allArticles: [],
  error: ''
};
const articleTitle = 'thi ergdfjhfgfdfgjtyguj';
const articleBody = 'this trduyfiugoiktuy vuyjtkghlikujh';
const tags = 't';
const articleIsValid = true;
const errors = {};

const data = {
  image: 'gfsdjhskfskejrd',
  tags: ['ghjfsdjg', 'trdufgkcfgyh', 'ghokhjhlk'],
  articleTitle: 'Goood this is working this is hoog ang workinh as itb should good',
  articleBody: 'Goood this is working this is hoog ang workinh as itb should good'
};
const dataTrue = {
  image: 'gfsdjhskfskejrd',
  articleTitle: 'Goood this is working this is hoog ang workinh as itb should good',
  articleBody: 'Goood this is working this is hoog ang workinh as itb should good'
};
const props = {
  getSingleArticle: mockFn,
  match: {
    params: { slug: 'when-to-use-refs' }
  },
  history: {}
};
global.URL.createObjectURL = jest.fn();
describe('Test CreateArticle Component', () => {
  it('Should render Properly', () => {
    wrapper = shallow(<CreateArticle articles={initialState} {...props} />);
    expect(wrapper.exists()).toBe(true);
    wrapper.instance().handleChange(event);
    wrapper.instance().componentDidMount(mockFn);
    wrapper.instance().handleImageUpload(event);
    wrapper.setState({ tags: data.tags });
    wrapper.instance().onSubmit(event);
    wrapper
      .instance()
      .handleArticleValidation(articleTitle, articleBody, tags, errors, articleIsValid);
    wrapper.setProps({ createUserArticle: mockFn });
    wrapper.instance().handleAddition(data.tags);
    wrapper.instance().handleImageDelete(event);
    wrapper.setState({ tags: data.tags });
    wrapper.instance().onSubmit(event);
    wrapper
      .instance()
      .handleArticleValidation(
        dataTrue.articleTitle,
        dataTrue.articleBody,
        errors,
        articleIsValid
      );
    wrapper.setProps({ createUserArticle: mockFn });
    wrapper.instance().onChange(data.articleBody);

    expect(mapStateToProps(initialState).isLoading).toEqual(undefined);
    wrapper.setState({ tags: data.tags });
    wrapper.instance().onSubmit(event);
    wrapper
      .instance()
      .handleArticleValidation(
        data.articleTitle,
        data.articleBody,
        data.tags,
        errors,
        articleIsValid
      );
  });
});
