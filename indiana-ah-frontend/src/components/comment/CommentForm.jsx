import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'better-react-spinkit';
import Form from 'react-bootstrap/Form';
import Textarea from 'react-textarea-autosize';
import Button from '../../styles/styledComponents/Button.jsx';
import { addComment } from '../../redux/actions/commentActions';

export class CommentForm extends Component {
  state = {
    text: '',
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const { slug } = this.props;

    const newComment = {
      commentBody: this.state.text,
    };

    await this.props.addComment(slug, newComment);
    this.setState({ text: '' });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="add-comment-box">
          <div className="card-body comment-form">
            <h1 className='mb-5'> Add Comment</h1>
            <Form onSubmit={this.onSubmit}>
              <div className="form-group">
              <Form.Group >
                <div className="row">
                  <div className="col-xs-3">
                    { this.props.auth.isVerified && <img src={this.props.user.userData.imageUrl}/>}

                  </div>

                  <div className="col-xs-9">
                    <Textarea
                      className="comment-textarea"
                      rows="1"
                      name="text"
                      value={this.state.text}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

              </Form.Group>
              <Form.Group>
              {
                this.state.text
                && <Button sm>
                Submit
                {this.props.isLoading && (
              <span className="button-loading">
                <Circle color={'rgba(11,65,205,1)'} />
              </span>
                )}
                </Button>
              }
              </Form.Group>
              </div>
            </Form>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func,
  user: PropTypes.object,
  slug: PropTypes.string,
  errors: PropTypes.object,
  isLoading: PropTypes.bool,
  auth: PropTypes.object

};

const mapStateToProps = state => ({
  errors: state.errors,
  user: state.user,
  auth: state.auth,
  isLoading: state.comments.isLoading
});

export default connect(mapStateToProps, { addComment })(CommentForm);
