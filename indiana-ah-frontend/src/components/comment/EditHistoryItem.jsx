import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const EditHistoryItem = ({ comment }) => (
  <div className="edit-history">
    <div className="row">
      <div className="col-xs-4"><i className="far fa-clock 2x"></i>
        <span className="edit-history-time"> Edited: &nbsp;
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>
    </div>
    <div className="row">
      <div className="col-md-11">
        {comment.commentBody}
      </div>
    </div>
  </div>
);


EditHistoryItem.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default EditHistoryItem;
