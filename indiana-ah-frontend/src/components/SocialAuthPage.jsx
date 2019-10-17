import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginWithSocialMedia } from '../redux/actions/authActions';

class SocialAuthPage extends Component {
  state = {
    message: 'We are verifying your account.....'
  };

  componentDidMount() {
    const { search } = window.location;
    const token = new URLSearchParams(search).get('token');
    this.props.loginWithSocialMedia(token);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

SocialAuthPage.propTypes = {
  loginWithSocialMedia: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(null, { loginWithSocialMedia })(withRouter(SocialAuthPage));
