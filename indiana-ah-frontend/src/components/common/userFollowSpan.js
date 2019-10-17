import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import { followOrUnfollow } from '../../redux/actions/userFollowActions';

const UnfollowUser = (username, followUnFollowFunc) => {
  followUnFollowFunc(username, 'Unfollow');
};

const renderTooltipUnfollow = props => (
  <div
    {...props}
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: '10px',
      color: 'white',
      borderRadius: 3,
      ...props.style
    }}
  >
    <Button className="follow-btn">Unfollow</Button>
  </div>
);

const userFollowSpan = ({
  userDetails: { username, imageUrl },
  followOrUnfollow: followUnFollowFunc,
  visible
}) => (
  <Fragment>
    <div
      className="col-lg-3 bg-suc mb-5 p-3"
      onClick={UnfollowUser.bind(this, username, followUnFollowFunc)}
    >
      <div className="row">
        <div className="col-md-4  vl">
          <div className="d-inline-block">
            <div className="user-image-container-f d-inline-block">
              <img
                src={imageUrl}
                alt="John Doe"
                className=" img-fluid mr-3 user-follow-img"
              />
            </div>
          </div>
        </div>

        <div className="col-md-8 vl">
          {visible === true ? (
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 1300 }}
              overlay={renderTooltipUnfollow}
            >
              <div className="userfollow-name  d-inline-block">
                {username.replace(/\d{5,}/, '')}
              </div>
            </OverlayTrigger>
          ) : (
            <div className="userfollow-name  d-inline-block">
              {username.replace(/\d{5,}/, '')}
            </div>
          )}
        </div>
      </div>
    </div>
  </Fragment>
);

userFollowSpan.propTypes = {
  imageUrl: PropTypes.string,
  button: PropTypes.string,
  userDetails: PropTypes.object,
  style: PropTypes.object,
  followOrUnfollow: PropTypes.func,
  visible: PropTypes.bool
};

export { userFollowSpan };

export default connect(
  null,
  { followOrUnfollow }
)(userFollowSpan);
