/* eslint-disable class-methods-use-this */
import React, { Fragment, Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import UserArticlesPage from './UserArticlesPage.jsx';
import UserBookmarkPage from './UserBookmarksPage.jsx';
import UsersFollowingPage from './UsersFollowingPage.jsx';
import UserFollowers from './UserFollowersPage.jsx';
import SideNav from './SideNav.jsx';
import TabNav from './TabNav.jsx';


class UserDashboard extends Component {
  componentDidMount = async () => {
    document.body.style.marginBottom = '0';
  };

  componentWillUnmount() {
    document.body.style.marginBottom = '30rem';
  }

  render() {
    return (
      <Fragment>
        <div className="user-dashboard">
          <SideNav className="side-nav" />
          <div className="dashboard-column">
            <TabNav className="tab-nav" location={this.props.location} />
            <Switch>
              <Route path="/dashboard/posts" component={UserArticlesPage} />
              <Route path="/dashboard/bookmarks" component={UserBookmarkPage} />
              <Route path="/dashboard/following" component={UsersFollowingPage} />
              <Route path="/dashboard/followers" component={UserFollowers} />
            </Switch>
          </div>
        </div>
        </Fragment>
    );
  }
}

UserDashboard.propTypes = {
  location: PropTypes.object
};

export default UserDashboard;
