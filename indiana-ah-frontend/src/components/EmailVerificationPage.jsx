import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Button from '../styles/styledComponents/Button.jsx';
import { sendUserEmail } from '../redux/actions/authActions';

export class EmailVerificationPage extends Component {
  render() {
    return (
      <div className="verify-account">
        <p>Click on the Button Below</p>
        <p>An Email will be sent to you to verify your account</p>
        <a onClick={this.props.sendUserEmail}>
          <Button type="submit" bgColor margin={'auto'} height={'5rem'} sm>
            Verify your Account
          </Button>
        </a>
      </div>
    );
  }
}

EmailVerificationPage.propTypes = {
  sendUserEmail: PropTypes.func
};
export default connect(
  null,
  { sendUserEmail }
)(EmailVerificationPage);
