import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TopBarProgress from 'react-topbar-progress-indicator';
import PropTypes from 'prop-types';
import {
  getAllUsersFollowed
} from '../redux/actions/userFollowActions';
import UserFollowSpan from './common/userFollowSpan';


class UserFollowingPage extends Component {
  componentDidMount() {
    const { auth: { isVerified } } = this.props;
    if (isVerified) this.props.getAllUsersFollowed();
  }

  render() {
    let followingView;

    const { userFollow: { isUsersFollowedLoading: isLoading, UsersFollowed } } = this.props;

    if (!(isLoading || UsersFollowed.length)) {
      followingView = <h1> You Currently do not Follow anyone  </h1>;
    }
    if (!isLoading && UsersFollowed.length) {
      followingView = UsersFollowed.map((eachUser, index) => (<UserFollowSpan key = {index} userDetails = {eachUser} visible = {true}/>));
    }


    return (
      <Fragment>
        {isLoading && <TopBarProgress />}
        <div className="container">
         <div className="row no-gutters">
         {followingView}
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

UserFollowingPage.propTypes = {
  auth: PropTypes.object,
  getAllUsersFollowed: PropTypes.func,
  userFollow: PropTypes.object,
};

export { UserFollowingPage };

export default connect(
  mapStateToProps,
  { getAllUsersFollowed }
)(UserFollowingPage);
