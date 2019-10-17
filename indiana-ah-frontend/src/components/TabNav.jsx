import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TabNavBar = ({
  allUserArticles: { articleData },
  bookmarkedArticles: { userBookmarks },
  UsersFollowedCount,
  followersCount,
  location
}) => (
  <nav className="dashboard-nav">
    <NavLink
      to="/dashboard/posts"
      className={location.pathname === '/dashboard/posts' ? 'active-link' : undefined}
    >
      POSTS ({articleData.message ? 0 : articleData.totalCount})
    </NavLink>
    <NavLink
      to="/dashboard/bookmarks"
      className={location.pathname === '/dashboard/bookmarks' ? 'active-link' : undefined}
    >
      BOOKMARKED ({userBookmarks.length})
    </NavLink>
    <NavLink
      to="/dashboard/following"
      className={location.pathname === '/dashboard/following' ? 'active-link' : undefined}
    >
      FOLLOWING ({UsersFollowedCount})
    </NavLink>
    <NavLink
      to="/dashboard/followers"
      className={location.pathname === '/dashboard/followers' ? 'active-link' : undefined}
    >
      FOLLOWERS ({followersCount})
    </NavLink>
  </nav>
);

TabNavBar.propTypes = {
  allUserArticles: PropTypes.object,
  bookmarkedArticles: PropTypes.object,
  UsersFollowedCount: PropTypes.number,
  followersCount: PropTypes.number,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  allUserArticles: state.allUserArticles,
  bookmarkedArticles: state.bookmarkedArticles,
  UsersFollowedCount: state.userFollow.UsersFollowedCount,
  followersCount: state.userFollow.followersCount
});

export default connect(mapStateToProps)(TabNavBar);
