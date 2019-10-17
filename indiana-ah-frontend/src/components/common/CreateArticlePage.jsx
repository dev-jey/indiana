import React from 'react';
import ReactQuill from 'react-quill';
import { Circle } from 'better-react-spinkit';
import { PropTypes } from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import TagsInput from 'react-tagsinput';
import Button from '../../styles/styledComponents/Button.jsx';

const CreateArticlePage = ({
  articleTitle,
  displayImage,
  tags,
  isLoading,
  formats,
  modules,
  errors,
  onSubmit,
  handleImageDelete,
  handleImageUpload,
  handleAddition,
  handleChange,
  onChange,
  articleBody
}) => (
  <div className="text-editor">
    <form onSubmit={onSubmit}>
      <textarea
        rows="1"
        cols="50"
        name="articleTitle"
        value={articleTitle}
        placeholder="Title"
        onChange={handleChange}
      />
      <div className="errorMsg">{errors.articleTitle}</div>
      <div className="article-button">
        <div className="image-button">
          <label htmlFor="image">
            <i className="fa fa-upload" /> <span>Attach a cover picture (Optional)</span>
            <input
              id="image"
              type="file"
              image=""
              name="image"
              className="input"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
        </div>
        {displayImage && (
          <span>
            <i className="fa fa-times" onClick={handleImageDelete} />
          </span>
        )}
      </div>
      {displayImage && (
        <div className="image-div">
          <img className="upload-image" src={displayImage} />
        </div>
      )}
      <ReactQuill
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={'Tell your Story....'}
        value={articleBody || ''}
        className="react-quil"
      />
      <div className="errorMsg">{errors.articleBody}</div>
      <div>
        <div className="section-preview chips">
          <span className="tag">Tags</span>
          <TagsInput
            value={tags}
            onChange={handleAddition}
            focusedClassName="tag-input-focus"
          />
        </div>
        <div className="errorMsgtag">{errors.tags}</div>
      </div>

      <Button bgColor className="article-submit" disabled={isLoading}>
        <i className="fas fa-pen" />
        Publish{isLoading && 'ing'}
        {isLoading && (
          <span style={{ float: 'right', padding: '3px 3px 0 10px' }}>
            <Circle color={'#FFFFFF'} />
          </span>
        )}
      </Button>
    </form>
  </div>
);

CreateArticlePage.propTypes = {
  articleTitle: PropTypes.string,
  displayImage: PropTypes.string,
  articleBody: PropTypes.string,
  tags: PropTypes.array,
  isLoading: PropTypes.bool,
  formats: PropTypes.array,
  modules: PropTypes.object,
  errors: PropTypes.object,
  onSubmit: PropTypes.func,
  handleImageDelete: PropTypes.func,
  handleImageUpload: PropTypes.func,
  handleAddition: PropTypes.func,
  handleChange: PropTypes.func,
  onChange: PropTypes.func
};
export default CreateArticlePage;
