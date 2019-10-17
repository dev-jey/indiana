import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../common/input/InputComponent.jsx';
import Button from '../../styles/styledComponents/Button.jsx';
import { updatePassword } from '../../redux/actions/profileActions';
import { passwordFormSchema, validationMessages } from '../../utils/validationSchemas';

export class PasswordForm extends Component {
  state = {
    data: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    errors: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.profileData.error === this.props.profileData.error) return;
    if (this.props.profileData.error) {
      const { error } = this.props.profileData;
      const errors = { ...this.state.errors };

      if (error.includes('Passwords must be the same')) errors.confirmpassword = error;
      this.setState({ errors });
    }
  }

  onChange = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    });
  };

  handleBlur = ({ target: input }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const field = input.id;
    const newPassword = 'newPassword';
    if (!passwordFormSchema[newPassword].test(data[newPassword])) {
      errors.newPassword = validationMessages.newPassword;
    }
    if (data.confirmPassword && data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = validationMessages.confirmPassword;
    } else if (data.confirmPassword && data.newPassword === data.confirmPassword) {
      errors.confirmPassword = '';
    }
    if (!data[field]) errors[field] = `${field} is required`;

    this.setState({ errors });
  };

  handleSubmit = () => {
    const { updateUserPassword } = this.props;
    const { currentPassword, newPassword, confirmPassword } = this.state.data;
    updateUserPassword({ currentPassword, newPassword, confirmPassword });
  };

  render() {
    const {
      data: { currentPassword, newPassword, confirmPassword },
      errors
    } = this.state;

    return (
      <div className="col-md-6 password-form">
        <h3 className="text-center">Change Password</h3>
        <div>
          <Input
            type="password"
            margin=".2rem"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword || ''}
            width="100%"
            wrapper="input-div"
            handleChange={this.onChange}
            placeholder="Current Password"
            errorMessage={errors.currentPassword || ''}
            onBlur={this.handleBlur}
          />
        </div>
        <div>
          <Input
            type="password"
            margin=".2rem"
            name="newPassword"
            width="100%"
            id="newPassword"
            value={newPassword || ''}
            wrapper="input-div"
            handleChange={this.onChange}
            placeholder="New Password"
            errorMessage={errors.newPassword || ''}
            onBlur={this.handleBlur}
          />
        </div>
        <div className="mb-30">
          <Input
            type="password"
            margin=".2rem"
            width="100%"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword || ''}
            wrapper="input-div mb-30"
            handleChange={this.onChange}
            placeholder="Confirm Password"
            onBlur={this.handleBlur}
            errorMessage={errors.confirmPassword}
          />
        </div>
        <Button
          sm
          onClick={this.handleSubmit}
          disabled={!(currentPassword && newPassword && confirmPassword)}>
          Save
        </Button>
      </div>
    );
  }
}
PasswordForm.propTypes = {
  updateUserPassword: PropTypes.func,
  profileData: PropTypes.object
};
const mapDispatchToProps = dispatch => ({
  updateUserPassword: data => dispatch(updatePassword(data))
});

const mapStateToProps = state => ({
  profileData: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordForm);
