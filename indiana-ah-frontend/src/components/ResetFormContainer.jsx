import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';
import { withRouter } from 'react-router-dom';
import { sendResetLink } from '../redux/actions/authActions';
import InputField from './common/input/InputComponent.jsx';
import Button from '../styles/styledComponents/Button.jsx';
import { logo } from '../assets/images/svg';

export class ResetFormContainer extends Component {
  state = {
    email: ''
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.sendResetLink({ email: this.state.email }, this.props);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email } = this.state;
    const { auth: { isLoading } } = this.props;
    return (
      <div className='signup-form-container'>
        <h3 className='text-center mt-5'>
          <img src={logo} alt='facebook logo' className='signup-title' />
          <hr />
        </h3>
        <form onSubmit={this.handleSubmit} className='signup-form mb-5'>
          <InputField
            width='100%'
            placeholder='Email'
            type='email'
            id='email'
            name='email'
            value={email}
            handleChange={this.handleChange}
          />
          <p className='text-center'>A reset link would be sent to your email</p>
          <Button
            type='submit'
            bgColor
            width={'100%'}
            margin={'auto'}
            height={'4.8rem'}
            sm>
            Reset Password
            {isLoading && (
              <span className='button-loading'>
                <Circle color={'rgba(255,255,255,1)'} />
              </span>
            )}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { sendResetLink }
)(withRouter(ResetFormContainer));

ResetFormContainer.propTypes = {
  auth: PropTypes.object,
  displayForm: PropTypes.func,
  sendResetLink: PropTypes.func
};
