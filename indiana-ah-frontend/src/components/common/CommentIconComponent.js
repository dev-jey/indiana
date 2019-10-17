import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CommentIcon from '../../assets/images/icons/chat-1.png';

const CommentIconComponent = ({ commentCount }) => (
<Fragment>
<span className = 'icon-holder'>
<img src = {CommentIcon} alt = 'CommentIcon' className= 'icon-color icon-height icon_margin'/>
<sub className='count'>{commentCount || ''}</sub>
</span>
</Fragment>
);

CommentIconComponent.propTypes = {
  commentCount: PropTypes.number.isRequired,
};

export default CommentIconComponent;
