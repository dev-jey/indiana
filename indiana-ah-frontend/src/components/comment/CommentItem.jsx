import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Circle } from 'better-react-spinkit';
import { Dropdown, Badge } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Textarea from 'react-textarea-autosize';
import Button from '../../styles/styledComponents/Button.jsx';
import Modal from '../common/Modal.jsx';
import { deleteComment, editComment } from '../../redux/actions/commentActions';
import { reactToComment } from '../../redux/actions/reactionActions';
import EditHistoryfeed from './EditHistoryFeed.jsx';
import getCommentEditHistory from '../../redux/actions/editHistoryActions';

export class CommentItem extends Component {
  state = {
    modalIsOpen: false,
    showModal: false,
    text: this.props.comment.commentBody
  };

  handleCommentDelete(commentId) {
    this.props.deleteComment(commentId);
  }

  handleCommentUpdate = async (e, commentId) => {
    e.preventDefault();
    const response = await this.props.editComment(commentId, this.state.text);
    if (response === 'Comment successfully updated') {
      this.setState(() => ({ showModal: false }));
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async showEditHistory(commentId) {
    await this.props.getCommentEditHistory(commentId);
    this.setState({ modalIsOpen: true, modalContent: 'history' });
  }

  openModal = () => {
    this.setState(() => ({ modalIsOpen: true, modalContent: 'delete' }));
  }

  closeModal = () => {
    this.setState(() => ({ modalIsOpen: false, modalContent: null }));
  }

  editModal = () => {
    this.setState(() => ({ showModal: true }));
  };

  render() {
    const {
      comment, user, likes, dislikes, auth,
      editHistory
    } = this.props;
    const { modalContent, modalIsOpen } = this.state;
    const modalBody = (
      <div>
        <section className="comment-modal">
          <h2> Are you sure you want to delete this comment?</h2>
        </section>
        <section className="d-flex justify-content-center mb-5">
          <Button onClick={this.closeModal} sm className="mr-4">
            Cancel
          </Button>
          <Button onClick={this.handleCommentDelete.bind(this, comment.id)} danger sm>
            Delete
            {this.props.isLoading && (
              <span className="button-loading">
                <Circle color={'rgba(255,255,255,1)'} />
              </span>
            )}
          </Button>
        </section>
      </div>
    );


    let modalToOpen;
    if (modalContent === 'history') {
      modalToOpen = <EditHistoryfeed editHistory={ editHistory }/>;
    } else if (modalContent === 'delete') {
      modalToOpen = modalBody;
    } else {
      modalToOpen = '';
    }
    const editModal = (
      <div className="add-comment-box">
        <div className="card-body comment-form">
          <h1 className="mb-5"> Edit Comment</h1>
          <Form>
            <div className="form-group">
              <Form.Group>
                <div className="row">
                  <div className="col-xs-3">
                    {this.props.auth.isVerified && (
                      <img src={this.props.user.userData.imageUrl} />
                    )}
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
                <div className="edit">
                  <Button onClick={this.closeModal} className="mr-4 edit-button">
                    Cancel
                  </Button>
                  <span className="span" />
                  <Button
                    className="mr-4 edit-button "
                    onClick={e => this.handleCommentUpdate(e, comment.id)}
                  >
                    Submit
                    {this.props.isLoading && (
                      <span className="button-loading">
                        <Circle color={'rgba(11,65,205,1)'} />
                      </span>
                    )}
                  </Button>
                </div>
              </Form.Group>
            </div>
          </Form>
        </div>
      </div>
    );

    return (
      <>
        <div className="comment-item-section">
          <div className="row">
            <div className="col-xs-3">
              <img className="image" src={comment.commenter.imageUrl} alt="" />
            </div>
            <div className="col-xs-5 ml-3">
              <p className="text-center">
                <b>{comment.commenter.username.replace(/\d{5,}/, '')}</b>
              </p>
            </div>

            <div className="col-xs-4">
              <i className="far fa-clock 2x"> </i>
              <span className="comment-time">
                {' '}
                &nbsp; {moment(comment.createdAt).fromNow()}
              </span>&nbsp;
              {
                (comment.updatedAt > comment.createdAt)
                && (
                  <Badge pill variant="secondary">
                    Edited
                  </Badge>
                )
              }
            </div>
          </div>
          <div className="row">
            <div className="col-md-11 pl-10">
              <p className="comment-body">{comment.commentBody}</p>
            </div>
            {comment.userId === user.userData.id && (
              <Dropdown>
                <Dropdown.Toggle>&#8942;</Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item as="div" onClick={this.editModal}>
                    <span>Edit</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={this.openModal}>
                    <span>Delete</span>
                  </Dropdown.Item>
                  {
                  (comment.updatedAt > comment.createdAt)
                  && <>
                  <Dropdown.Divider />
                      <Dropdown.Item ><span onClick={this.showEditHistory.bind(this, comment.id)}>Edit History</span></Dropdown.Item>
                  </>
                }
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
          <div className="row comment-reaction">
            <div className="col-xs-6 ml-6">
              {' '}
              <i
                className={`${comment.likedByMe ? 'fas' : 'far'} fa-thumbs-up mr-2`}
                onClick={
                  auth.isVerified
                    ? () => this.props.reactToComment(comment.id, 'like')
                    : undefined
                }
              />
              <small>{likes}</small>
            </div>
            <div className="col-xs-6 ml-5">
              <i
                className={`${comment.dislikedByMe ? 'fas' : 'far'} fa-thumbs-down mr-2`}
                onClick={
                  auth.isVerified
                    ? () => this.props.reactToComment(comment.id, 'dislike')
                    : undefined
                }
              />
              <small>{dislikes}</small>
            </div>
          </div>
        </div>
        {this.state.showModal && editModal}
        <Modal
            modalIsOpen={modalIsOpen}
            closeModal={this.closeModal}
            customClass={modalContent === 'history' && 'comment-item-page'}
            body={ modalToOpen}
        />
      </>
    );
  }
}

CommentItem.propTypes = {
  getCommentEditHistory: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  editHistory: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  editComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  reactToComment: PropTypes.func,
  likes: PropTypes.any,
  dislikes: PropTypes.any
};

const mapStateToProps = state => ({
  user: state.user,
  isLoading: state.comments.isLoading,
  auth: state.auth,
  editHistory: state.editHistory.editHistory
});

export default connect(
  mapStateToProps,
  {
    deleteComment,
    editComment,
    reactToComment,
    getCommentEditHistory
  }
)(CommentItem);