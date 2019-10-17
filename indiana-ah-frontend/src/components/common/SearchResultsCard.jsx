import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchResultsCard = ({
  article: {
    slug,
    articleTitle,
    articleBody,
    imageUrl,
    author,
    createdAt,
    Comments,
    likes,
    dislikes
  }
}) => (
  <div className="search-card-container">
    <NavLink to={`/articles/${slug}`}>
      <div className="autor-sec mb-2">
        <img src={author.imageUrl} className="author-image" />{' '}
        <h5>{author.username ? author.username.replace(/\d{5,}/, '') : ' '}</h5>
      </div>
      <div className="article-sec mb-4">
        <img
          src={
            imageUrl
            || 'https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          }
          className="article-image  mb-3"
        />
        <div className="article-title-row mb-1">{articleTitle}</div>
        <hr />
        <div
          className="article-body-row mb-3"
          dangerouslySetInnerHTML={{ __html: articleBody }}
        />
      </div>
      <div className="bottom-row">
        <div className="reactions-sec">
          <span className="mr-4">
            <i className="far fa-thumbs-up" aria-hidden="true" />
            <small className="ml-1">{likes}</small>
          </span>

          <span className="mr-4">
            <i className="far fa-thumbs-down" aria-hidden="true" />
            <small className="ml-1">{dislikes}</small>
          </span>
          <span className="mr-4">
            <i className="far fa-comments" aria-hidden="true" />
            <small className="ml-1">{Comments.length}</small>{' '}
          </span>
        </div>
        <div className="time-ago">
          <i className="far fa-clock mr-2" />
          <small>{moment(createdAt).fromNow()}</small>
        </div>
      </div>
    </NavLink>
  </div>
);

SearchResultsCard.propTypes = {
  article: PropTypes.object
};

export default SearchResultsCard;
