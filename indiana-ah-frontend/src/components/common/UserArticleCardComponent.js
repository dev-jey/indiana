import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import BadgeComponent from './BadgeComponent';
import LikeComponent from './LikeComponent';
import DislikeComponent from './DislikeComponent';
import CommentIconComponent from './CommentIconComponent';
import TimerComponent from './TimerComponent';
import { deleteArticles } from '../../redux/actions/articleActions/articleActions';

const deleteArticleFunc = (slug, deleteBySlug) => swal({
  title: 'Are you sure?',
  text: 'Once deleted, you will not be able to recover this article',
  icon: 'warning',
  buttons: true,
  dangerMode: true
}).then((willDelete) => {
  if (willDelete) deleteBySlug(slug);
});

const UserArticleCard = ({
  img,
  articleTitle,
  articleBody,
  tags,
  slug,
  likeCount,
  dislikeCount,
  commentCount,
  timeCount,
  deleteArticles: deleteBySlug
}) => {
  const createMarkup = () => ({ __html: articleBody });
  return (
    <Fragment>
      <Card className="user-article-card">
        <div className="article-image-wrapper">
          <img src={img} className="img-fluid" />
        </div>

        <Card.Body className="article-card-body">
          <NavLink to={`/articles/${slug}`}>
            <div className="article-title-div">
              <b className="text-body">{articleTitle}</b>
            </div>
            <div className="article-body" dangerouslySetInnerHTML={createMarkup()} />
          </NavLink>
          {tags && (
            <div className="tags-wrapper">
              {tags.split(',').map((eachTag, index) => (
                <BadgeComponent key={index} eachTagDetail={eachTag} />
              ))}
            </div>
          )}

          <div className="container">
            <div className="row no-gutters">
              <div className="icons">
                <div className="row">
                  {timeCount !== 'false' && (
                    <span className="icon-item timer">
                      <TimerComponent timeCount={timeCount} />
                    </span>
                  )}
                  <span className="icon-item">
                    <LikeComponent likeCount={likeCount} color="black" />
                  </span>
                  <span className="icon-item">
                    <DislikeComponent dislikeCount={dislikeCount} color="black" />
                  </span>
                  <span className="icon-item">
                    <CommentIconComponent commentCount={commentCount} />
                  </span>
                </div>
              </div>
              <div className="action-button">
                {timeCount === 'false' ? (
                  <i className="fas fa-bookmark fa-2x brand-color" />
                ) : (
                  <ButtonGroup className="user-article-btn">
                    <NavLink to={`/article/update/${slug}`}>
                      <Button variant="primary">Edit</Button>
                    </NavLink>
                    <Button
                      variant="danger"
                      onClick={() => deleteArticleFunc(slug, deleteBySlug)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

UserArticleCard.defaultProps = {
  tags: '',
  likeCount: 0,
  dislikeCount: 0,
  commentCount: 0
};

UserArticleCard.propTypes = {
  img: PropTypes.string.isRequired,
  timeCount: PropTypes.string.isRequired,
  articleTitle: PropTypes.string.isRequired,
  articleBody: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  dislikeCount: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  deleteArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  articles: state.articles,
  bookmarkedArticles: state.bookmarkedArticles
});

export { UserArticleCard };

export default connect(
  mapStateToProps,
  { deleteArticles }
)(UserArticleCard);
