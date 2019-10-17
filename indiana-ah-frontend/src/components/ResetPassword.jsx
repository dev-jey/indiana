import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { Circle } from 'better-react-spinkit';
import { withRouter } from 'react-router-dom';
import { resetPassword } from '../redux/actions/authActions';
import InputField from './common/input/InputComponent.jsx';
import Button from '../styles/styledComponents/Button.jsx';
import {
  signUpFormSchema, validationMessages, checkIfSame, validate
} from '../utils/validationSchemas';

export class ResetPassword extends Component {
  state = {
    data: {
      password: '',
      confirmPassword: '',
    },
    errors: {}
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate(this.state.errors)) {
      return;
    }
    const data = {
      password: this.state.data.password,
    };
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('query');
    this.props.resetPassword(data, token, this.props);
  };

  handleChange = ({ target: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const field = input.name;
    data[field] = input.value;
    errors[field] = '';
    this.setState({ data, errors });
  };

  handleBlur = ({ target: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const field = input.name;
    if (field === 'confirmPassword') {
      if (!checkIfSame(this.state.data.password, this.state.data.confirmPassword)) {
        errors[field] = validationMessages[field];
      }
    } else if (!signUpFormSchema[field].test(data[field])) {
      errors[field] = validationMessages[field];
    }
    if (!data[field]) errors[field] = `${field} is required`;

    this.setState({ errors });
  };

  render() {
    const {
      data: { password, confirmPassword },
      errors
    } = this.state;
    const { auth: { isLoading } } = this.props;
    return (
      <div className='container'>
        <Row className='justify-content-center reset-password'>
          <div className='col-md-5 col-sm-7'>
            <h2 className='text-center mt-5'>
              Reset Password
            </h2>
            <form onSubmit={this.handleSubmit} className='signup-form mb-5'>
              <InputField
                width='100%'
                placeholder='Password'
                type='password'
                id='password'
                name='password'
                value={password}
                errorMessage={errors.password}
                handleChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <InputField
                width='100%'
                placeholder='Confirm Password'
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                errorMessage={errors.confirmPassword}
                handleChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <Button
                type='submit'
                bgColor
                disabled={isLoading}
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
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(ResetPassword));

ResetPassword.propTypes = {
  auth: PropTypes.object,
  resetPassword: PropTypes.func
};
