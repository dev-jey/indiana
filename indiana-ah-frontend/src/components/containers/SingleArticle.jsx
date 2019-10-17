import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getSingleArticle from '../../redux/actions/getSingleArticleActions/getSingleArticleActions';
import { reactToArticle } from '../../redux/actions/reactionActions';
import { twitter, facebook } from '../../assets/images/svg';
import addBookmark from '../../redux/actions/bookmarkActions';
import { getAllUsersBookMarkedArticles } from '../../redux/actions/articleActions/articleActions';
import LikeComponent from '../common/LikeComponent';
import DislikeComponent from '../common/DislikeComponent';
import CommentIconComponent from '../common/CommentIconComponent';
import Footer from '../common/footer.jsx';
import SignupContainer from '../SignupFormContainer.jsx';
import LoginContainer from '../LoginFormContainer.jsx';
import ResetContainer from '../ResetFormContainer.jsx';
import Modal from '../common/Modal.jsx';
import { getArticleComments } from '../../redux/actions/commentActions';
import Commentform from '../comment/CommentForm.jsx';
import Commentfeed from '../comment/CommentFeed.jsx';
import {
  getAllUsersFollowed, followOrUnfollow
} from '../../redux/actions/userFollowActions';

class SingleArticle extends Component {
  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState(() => ({ modalIsOpen: true }));
  };

  closeModal = () => {
    const {
      auth: { isLoading }
    } = this.props;
    if (!isLoading) this.setState(() => ({ modalIsOpen: false }));
  };

  userFollowFunc = (username, buttonAction) => {
    this.props.followOrUnfollow(username, buttonAction);
  };

  displayForm = (form) => {
    this.setState({ modalIsOpen: true, modalContent: form });
  };

  componentDidMount() {
    const { match, history } = this.props;
    const { slug } = match.params;
    this.props.getSingleArticle(slug, history);
    this.props.getArticleComments(slug);
    if (this.props.auth.isVerified) {
      this.props.getAllUsersFollowed();
      this.props.getAllUsersBookMarkedArticles();
    }
  }

  handleBookmarkclick = () => {
    const articleId = this.props.singleArticle.article.id;
    this.props.addBookmark(articleId);
  };

  render() {
    const { modalContent } = this.state;
    const { comments } = this.props;
    let articleTags = null;
    let viewingUser;
    let buttonAction;
    const delayDisplay = (
      <div
        className="carousel-spinner
      spinner-grow spinner-grow-lg text-primary"
      />
    );
    if (this.props.user.userData) {
      viewingUser = this.props.user.userData.username;
    }
    const {
      slug,
      articleTitle,
      timeToRead,
      likes,
      dislikes,
      imageUrl,
      tags,
      likedByMe,
      dislikedByMe,
      author,
      createdAt,
      articleBody
    } = this.props.singleArticle.article;

    const { isVerified } = this.props.auth;
    const { userFollow: { isUsersFollowedLoading: isLoading, UsersFollowed } } = this.props;

    const currentBookmark = this.props.bookmarkedArticles.userBookmarks.find(
      article => article.articleId === this.props.singleArticle.article.id
    );

    const createMarkup = () => ({ __html: articleBody });
    if (tags) {
      articleTags = tags.split(',').map((tag, index) => (
        <Link className="article-tags" to={`/search?tag=${tag}`} key={index}>
          <span>{tag}</span>
        </Link>
      ));
    }
    const imageStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    };
    const dateCreated = new Date(createdAt);
    const displayedDate = `${dateCreated.getDate()}
    /${dateCreated.getMonth()}/${dateCreated.getFullYear()}`;
    if (
      this.props.singleArticle.isLoading
      || isLoading
      || !this.props.singleArticle.article.articleBody
    ) return delayDisplay;


    const articleAuthor = author.username;

    if (!(isLoading || UsersFollowed.length)) {
      buttonAction = 'Follow';
    }

    if (!isLoading && UsersFollowed.length) {
      const result = UsersFollowed.filter(eachUser => eachUser.username === articleAuthor)[0];
      buttonAction = result ? 'Unfollow' : 'Follow';
    }
    const form = () => {
      switch (modalContent) {
        case 'login':
          return <LoginContainer
            displayForm={this.displayForm}
            closeModal={this.closeModal}
          />;
        case 'register':
          return <SignupContainer
            displayForm={this.displayForm}
            closeModal={this.closeModal}
          />;
        case 'reset':
          return <ResetContainer
            displayForm={this.displayForm}
            closeModal={this.closeModal}
          />;
        default:
          return null;
      }
    };

    return (
      <>
        <div className="SingleArticle">
          <div className="heading-section">
            <h1 className="heading-primary">{articleTitle}</h1>
            <div className="heading-info">
              <div className="article-info">
                <div className="author-image-box">
                  <p className="author">
                    {' '}
                    written by{' '}
                    {author.username ? author.username.replace(/\d{5,}/, '') : ''}
                  </p>
                  <img
                    src={author.imageUrl}
                    alt="user-image"
                    width="50"
                    height="50"
                    className="user-image"
                  />
                </div>
                {isVerified && viewingUser !== author.username && (
                  <div className="follow-bookmark-box">
                    <button
                    className="follow-btn"
                    onClick={ () => this.userFollowFunc(articleAuthor, buttonAction)}
                    >
                    {buttonAction}
                    </button>
                    <span>
                      <i
                        onClick={this.handleBookmarkclick}
                        className={
                          currentBookmark
                            ? 'fas fa-bookmark fa-4x bookmarked-icon'
                            : 'far fa-bookmark fa-4x unbookmarked-icon'
                        }
                      />
                    </span>
                  </div>
                )}
              </div>
              <p className="date-created">{displayedDate}</p>
              <p className="time-to-read">{timeToRead}</p>
            </div>
          </div>
          {imageUrl && <section className="article-image-container" style={imageStyle} />}
          <section className="article-body-container">
            <div className="article-body" dangerouslySetInnerHTML={createMarkup()} />
            <div className="tags-container">{articleTags}</div>
            <section className="reaction-share-section">
              <div className="reaction-container">
                <LikeComponent
                  className="reaction-logo"
                  likeCount={likes}
                  color={likedByMe ? '#0B41CD' : 'rgba(0,0,0,.5)'}
                  id={slug}
                  onClick={
                    this.props.auth.isVerified
                      ? () => this.props.reactToArticle(slug, 'like')
                      : () => this.displayForm('login')
                  }
                  likedByMe={likedByMe}
                />
                <DislikeComponent
                  className="reaction-logo"
                  dislikeCount={dislikes}
                  color={dislikedByMe ? '#0B41CD' : 'rgba(0,0,0,.5)'}
                  onClick={
                    this.props.auth.isVerified
                      ? () => this.props.reactToArticle(slug, 'dislike')
                      : () => this.displayForm('login')
                  }
                />
                <CommentIconComponent
                  className="reaction-logo"
                  commentCount={comments.length}
                />
              </div>
              <div className="share-container">
                <span className="social share-text">Share on</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${
                    window.location.href
                  }`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img src={facebook} alt="facebook logo" className="social" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                  className="twitter-share-button"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img src={twitter} alt="twitter logo" className="social" />
                </a>
              </div>
            </section>
            <section className="comment-section">
              {isVerified && (
                <>
                  <div className="container pt-5 pb-5">
                    <Commentform slug={slug} />
                  </div>
                  <hr />
                </>
              )}
              <div className="container pt-5 pb-5">
                <h2>Comments</h2>
                <Commentfeed comments={comments} />
              </div>
            </section>
          </section>
          <Modal
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            body={form()}
          />
        </div>
        <Footer />
      </>
    );
  }
}

SingleArticle.propTypes = {
  comments: PropTypes.array.isRequired,
  addBookmark: PropTypes.func.isRequired,
  getArticleComments: PropTypes.func.isRequired,
  getSingleArticle: PropTypes.func.isRequired,
  followOrUnfollow: PropTypes.func.isRequired,
  getAllUsersBookMarkedArticles: PropTypes.func.isRequired,
  getAllUsersFollowed: PropTypes.func.isRequired,
  bookmarkedArticles: PropTypes.object.isRequired,
  singleArticle: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  userFollow: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object,
  reactToArticle: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  singleArticle: state.singleArticle,
  auth: state.auth,
  user: state.user,
  bookmarkedArticles: state.bookmarkedArticles,
  comments: state.comments.comments,
  userFollow: state.userFollow
});

export { SingleArticle };

export default connect(
  mapStateToProps,
  {
    getSingleArticle,
    addBookmark,
    getAllUsersBookMarkedArticles,
    reactToArticle,
    getArticleComments,
    getAllUsersFollowed,
    followOrUnfollow
  }
)(SingleArticle);
