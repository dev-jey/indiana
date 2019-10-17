import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TopBarProgress from 'react-topbar-progress-indicator';
import PropTypes from 'prop-types';
import {
  getAllFollowers,
} from '../redux/actions/userFollowActions';
import UserFollowSpan from './common/userFollowSpan';


class UserFollowersPage extends Component {
  componentDidMount() {
    const { auth: { isVerified } } = this.props;
    if (isVerified) this.props.getAllFollowers();
  }

  render() {
    let followersView;
    const { userFollow: { isFollowersLoading: isLoading, followers } } = this.props;
    if (!(isLoading || followers.length)) {
      followersView = <h1> You do not have any followers  </h1>;
    }
    if (!isLoading && followers.length) {
      followersView = followers.map((eachUser, index) => (<UserFollowSpan key = {index} userDetails = {eachUser} visible = {false} />));
    }


    return (
      <Fragment>
        {isLoading && <TopBarProgress />}
        <div className="container">
         <div className="row no-gutters">
         {followersView}
         </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  userFollow: state.userFollow
});

UserFollowersPage.propTypes = {
  auth: PropTypes.object,
  getAllFollowers: PropTypes.func,
  userFollow: PropTypes.object,
};

export { UserFollowersPage };

export default connect(
  mapStateToProps,
  { getAllFollowers }
)(UserFollowersPage);
