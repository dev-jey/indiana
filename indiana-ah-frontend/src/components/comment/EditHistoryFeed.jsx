import React from 'react';
import PropTypes from 'prop-types';
import EditHistoryitem from './EditHistoryItem.jsx';

export const EditHistoryFeed = ({ editHistory }) => {
  const commentHistory = editHistory.reverse();
  const firstComment = commentHistory[0];
  return (
    <div className="edit-history-feed">
      <h2 className="text">Comment Edit History</h2><hr />
      <div className="first-comment"><EditHistoryitem comment={firstComment} /></div><hr/>
      {
        commentHistory.length
        && commentHistory.filter(comment => comment.id !== firstComment.id).map(comment => (
          <EditHistoryitem key={comment.id} comment={comment} />
        ))
      }
    </div>
  );
};

EditHistoryFeed.propTypes = {
  editHistory: PropTypes.array.isRequired,
};

export default EditHistoryFeed;
