import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import LikeComponent from './LikeComponent';
import DislikeComponent from './DislikeComponent';
import CommentIconComponent from './CommentIconComponent';

const defaultImage = 'https://images.unsplash.com/photo-1521120413309-42e7eada0334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';

const CardComponent = ({
  img,
  title,
  text,
  likeCount,
  dislikeCount,
  commentCount
}) => {
  const createMarkup = () => ({ __html: text });
  return (
    <Fragment>
        <Card className="carousel-card card-style">
          <div className="image-wrapper-card">
            <Card.Img
              variant="top"
              className="image-card-style"
              src={img || defaultImage}
            />
          </div>
          <Card.Body className="pb-0 card-body">
            <div className="title-height">
              <b>{title}</b>
            </div>

            <div className="text-height">
              <Card.Text className="card-text" dangerouslySetInnerHTML={createMarkup()} />
            </div>

            <div className="container">
              <div className="row mt-4 mb-5">
                <div className="col pl-0">
                  <LikeComponent likeCount={likeCount} color="rgba(0,0,0,.5)" />
                </div>
                <div className="col">
                  <DislikeComponent dislikeCount={dislikeCount} color="rgba(0,0,0,.5)" />
                </div>
                <div className="col">
                  <CommentIconComponent commentCount={commentCount} />
                </div>
                <div className="col" />
              </div>
            </div>
          </Card.Body>
        </Card>
    </Fragment>
  );
};

CardComponent.defaultProps = {
  likeCount: 0,
  dislikeCount: 0,
  commentCount: 0
};

CardComponent.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  dislikeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired
};

export default CardComponent;
