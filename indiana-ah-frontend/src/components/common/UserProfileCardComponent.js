import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';


const UserProfileCard = ({
  userName, img, postCount, bio, followingCount, followersCount,
}) => (
<Fragment>
<Card style={{ width: '38rem', height: '33rem' }} className = 'p-5 user-card'>
<div className = 'top-content mb-5'>
<span className = 'float-left'>
<p className = 'user-name'>{userName.replace(/\d{5,}/, '')}</p>
<b>Posts&nbsp;({postCount})</b>
</span>
  <div className = 'image-wrapper'>
<Card.Img variant='top' src= {img} className ='rounded-circle float-right user-img'/>
  </div>

  </div>
  <Card.Body className = 'pl-0 mt-5'>
    <div className = 'user-bio'>
     <p>{bio}</p>
    </div>
    <div className = 'user-follow-details'>
    <b className='float-left'>Following&nbsp;({followingCount})</b>
    <b className='float-right'>Followers&nbsp;({followersCount})</b>
    </div>
  </Card.Body>
</Card>
</Fragment>);


UserProfileCard.propTypes = {
  userName: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  postCount: PropTypes.number.isRequired,
  bio: PropTypes.string.isRequired,
  followingCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
};


export default UserProfileCard;
