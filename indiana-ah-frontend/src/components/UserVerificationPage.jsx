import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Wave } from 'better-react-spinkit';
import { verifyUser } from '../redux/actions/authActions';

export class UserVerificationPage extends Component {
  componentDidMount() {
    const { verifyUser: verify } = this.props;
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get('query');
    verify(query, this.props);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Fragment>
        <div>
          <h2 className="verification-message">Verifying your account......</h2>
          <div className="verification-loading">
            <span>
              <Wave size={100} />
            </span>
          </div>
          <div />
        </div>
      </Fragment>
    );
  }
}

UserVerificationPage.propTypes = {
  verifyUser: PropTypes.func
};

export default connect(
  null,
  { verifyUser }
)(withRouter(UserVerificationPage));
