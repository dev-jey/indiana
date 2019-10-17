import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';
import { withRouter } from 'react-router-dom';
import { loginWithEmail } from '../redux/actions/authActions';
import InputField from './common/input/InputComponent.jsx';
import Button from '../styles/styledComponents/Button.jsx';
import { logo } from '../assets/images/svg';

export class LoginFormContainer extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.loginWithEmail(this.state.data, this.props);
    const { error } = this.props.auth;
    this.setState({ error });
  };

  handleChange = ({ target: input }) => {
    const data = { ...this.state.data };
    const field = input.name;
    data[field] = input.value;
    this.setState({ data });
  };

  render() {
    const {
      data: { password, email },
      error
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
            placeholder="Email"
            type="email"
            id="email1"
            name="email"
            value={email}
            handleChange={this.handleChange}
          />
          <InputField
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            handleChange={this.handleChange}
          />
          {error && <div className="text-danger text-center">{error}</div>}
          <Button
            type="submit"
            disabled={isLoading}
            bgColor
            width={'95%'}
            margin={'auto'}
            height={'4.8rem'}
            sm>
            login
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
              <li className="social-auth">Or Login Using:</li>
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
        <p className="d-flex justify-content-center">
          Dont have an account?{' '}
          <a href="#" onClick={() => displayForm('register')} className="ml-2">
            Create one
          </a>
        </p>
        <div className="d-flex justify-content-center bg-light w-100 p-4 mt-3">
          <a href="#" onClick={() => displayForm('reset')}>Forgot password?</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginWithEmail }
)(withRouter(LoginFormContainer));

LoginFormContainer.propTypes = {
  auth: PropTypes.object,
  displayForm: PropTypes.func,
  loginWithEmail: PropTypes.func
};
