import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Circle } from 'better-react-spinkit';
import {
  signUpFormSchema, validationMessages, validate
} from '../utils/validationSchemas';
import { registerWithEmail } from '../redux/actions/authActions';
import InputField from './common/input/InputComponent.jsx';
import Button from '../styles/styledComponents/Button.jsx';
import { logo } from '../assets/images/svg';

export class SignupFormContainer extends Component {
  state = {
    data: {
      email: '',
      username: '',
      password: ''
    },
    errors: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps.auth.error === this.props.auth.error) return;
    const { error } = this.props.auth;
    const errors = { ...this.state.errors };

    if (error.match(/username/)) errors.username = error;
    if (error.match(/email/)) errors.email = error;
    this.setState({ errors });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(this.state.errors)) {
      return;
    }
    this.props.registerWithEmail(this.state.data, this.props);
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

    if (!signUpFormSchema[field].test(data[field])) {
      errors[field] = validationMessages[field];
    }

    if (!data[field]) errors[field] = `${field} is required`;

    this.setState({ errors });
  };

  render() {
    const {
      data: { username, password, email },
      errors
    } = this.state;
    const {
      auth: { isLoading },
      displayForm
    } = this.props;
    return (
      <div className="signup-form-container">
        <h3 className="text-center mt-5">
          <img src={logo} alt="facebook logo" className="signup-title" />
          <hr />
        </h3>
        <form onSubmit={this.handleSubmit} className="signup-form">
          <InputField
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            value={username}
            errorMessage={errors.username}
            handleChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <InputField
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={email}
            errorMessage={errors.email}
            handleChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <InputField
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            name="password"
            errorMessage={errors.password}
            handleChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <Button
            type="submit"
            disabled={isLoading}
            bgColor
            width={'95%'}
            margin={'auto'}
            height={'4.8rem'}
            sm
          >
            Sign up
            {isLoading && (
              <span className="button-loading">
                <Circle color={'rgba(255,255,255,1)'} />
              </span>
            )}
          </Button>
        </form>
        <div className="signup-form">
          <div className="social">
            <ul>
              <li className="social-auth">Or Signup Using:</li>
              <li>
                <a href="https://indiana-ah-staging.herokuapp.com/auth/facebook">
                  <i className="fab fa-lg fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href="https://indiana-ah-staging.herokuapp.com/auth/twitter">
                  <i className="fab fa-lg fa-twitter" />
                </a>
              </li>
              <li>
              <a href="https://indiana-ah-staging.herokuapp.com/auth/google">
                  <i className="fab fa-lg fa-google" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center">By signing up, you agree to our terms and condition</p>
        <div className="d-flex justify-content-center bg-light w-100 p-4 mt-3">
          Have an account?
          <a onClick={() => displayForm('login')} href="#" className="ml-2">
            Login
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

SignupFormContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  displayForm: PropTypes.func.isRequired,
  registerWithEmail: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { registerWithEmail }
)(withRouter(SignupFormContainer));
