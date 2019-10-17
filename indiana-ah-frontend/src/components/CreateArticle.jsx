import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import createUserArticle from '../redux/actions/articleActions/createArticleAction';
import 'react-tagsinput/react-tagsinput.css';
import CreateArticlePage from './common/CreateArticlePage.jsx';
import getSingleArticle from
  '../redux/actions/getSingleArticleActions/getSingleArticleActions';

export class CreateArticle extends Component {
  state = {
    articleBody: '',
    tags: [],
    articleTitle: '',
    image: null,
    displayImage: '',
    errors: {},
    formData: null
  };

  async componentDidMount() {
    this.setState({ formData: new FormData() });
    const { slug } = this.props.match.params;
    if (slug) {
      const article = await this.props.getSingleArticle(slug, this.props);
      const {
        articleBody, articleTitle, tags, imageUrl
      } = article;
      this.setState({
        articleBody,
        articleTitle,
        displayImage: imageUrl,
        tags: tags ? tags.split(',') : []
      });
    }
  }

  onChange = (html) => {
    this.setState({ articleBody: html });
  };

  handleImageUpload = (event) => {
    this.setState({
      image: event.target.files[0],
      displayImage: URL.createObjectURL(event.target.files[0])
    });
  };

  handleArticleValidation = (articleTitle, articleBody, tags) => {
    const errors = {};
    let articleIsValid = true;

    if (articleTitle.replace(/\s/g, '').length < 5) {
      articleIsValid = false;
      errors.articleTitle = '*Article Title must be at least 5 characters long';
    }

    if (articleBody.replace(/\s/g, '').length < 20) {
      articleIsValid = false;
      errors.articleBody = '*Article body must be at least 20 characters long';
    }
    if (tags !== '') {
      if (tags.length < 2) {
        articleIsValid = false;
        errors.tags = '*Tag must be at least 2 characters long';
      }
    }
    this.setState({
      errors
    });
    return articleIsValid;
  };

  handleAddition = (tags) => {
    this.setState({ errors: {}, tags });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      errors: {},
      [name]: value
    });
  };

  handleImageDelete = (event) => {
    event.preventDefault();
    this.setState({
      image: null,
      displayImage: null
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const data = { ...this.state };
    const { tags } = data;
    data.tags = tags.join();
    const { formData } = this.state;

    if (this.handleArticleValidation(data.articleTitle, data.articleBody, data.tags)) {
      if (!data.tags) {
        if (data.image) formData.append('image', data.image);
        formData.append('articleTitle', data.articleTitle);
        formData.append('articleBody', data.articleBody);
        this.props.createUserArticle(formData, this.props, data.slug);
      } else {
        if (data.image) formData.append('image', data.image);
        formData.append('articleTitle', data.articleTitle);
        formData.append('articleBody', data.articleBody);
        formData.append('tags', data.tags);
        this.props.createUserArticle(formData, this.props);
      }
    }
  };

  render() {
    const {
      articleTitle, tags, displayImage, articleBody
    } = this.state;
    const { isLoading } = this.props.articles;
    return (
      <CreateArticlePage
        articleTitle={articleTitle}
        tags={tags}
        articleBody={articleBody}
        displayImage={displayImage}
        isLoading={isLoading}
        modules={CreateArticle.modules}
        formats={CreateArticle.formats}
        errors={this.state.errors}
        onSubmit={this.onSubmit}
        handleAddition={this.handleAddition}
        handleImageDelete={this.handleImageDelete}
        handleImageUpload={this.handleImageUpload}
        handleChange={this.handleChange}
        onChange={this.onChange}
      />
    );
  }
}

export const mapStateToProps = state => ({
  articles: state.articles,
  singleArticle: state.singleArticle
});
CreateArticle.propTypes = {
  isLoading: PropTypes.bool,
  article: PropTypes.object,
  createUserArticle: PropTypes.func,
  getSingleArticle: PropTypes.func,
  articles: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  { createUserArticle, getSingleArticle }
)(CreateArticle);

CreateArticle.modules = {
  toolbar: [
    [{ font: [] }],
    ['bold', 'italic', 'underline'], // toggled buttons
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent text direction
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ['link']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/*
 * Quill CreateArticle formats
 */
CreateArticle.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'background',
  'list',
  'align',
  'direction',
  'bullet',
  'indent',
  'link',
  'code',
  'size',
  'color'
];
