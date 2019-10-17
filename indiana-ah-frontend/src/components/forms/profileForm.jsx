import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FadingCircle } from 'better-react-spinkit';
import { connect } from 'react-redux';
import Input from '../common/input/InputComponent.jsx';
import Button from '../../styles/styledComponents/Button.jsx';
import { updateUserProfile } from '../../redux/actions/profileActions';

export class ProfileForm extends Component {
  state = {
    name: '',
    username: '',
    bio: '',
    disabled: true,
    errors: ''
  };

  componentDidMount() {
    const { bio, username, name } = this.props.userProfile;
    this.setState({
      bio,
      username,
      name
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userProfile.bio !== this.props.userProfile.bio) {
      this.setState({ bio: this.props.userProfile.bio });
    }
    if (prevProps.profileData.error === this.props.profileData.error) return;
    if (this.props.profileData.error) {
      const { error } = this.props.profileData;
      const errors = { ...this.state.errors };
      if (error.includes('name')) errors.name = error;
      if (error.includes('username')) errors.username = error;
      this.setState({ errors, disabled: true });
    }
  }

  handleSubmit = () => {
    const { updateProfile } = this.props;
    const { name, username, bio } = this.state;
    updateProfile({ name, username, bio });
  };

  onChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      name: Name, username: Username, errors, bio: Bio
    } = this.state;
    const {
      bio, name, username, isLoading
    } = this.props.userProfile;
    return (
      <div className="col-md-12 profile-form">
        {isLoading && (
          <div className="loader">
            <FadingCircle className="loader-pic" size={100} color="white" />
          </div>
        )}
        <div className="details-form">
          <Input
            type="text"
            placeholder={name || ''}
            margin="1.2rem"
            name="name"
            id="name"
            value={Name}
            wrapper="input-div"
            handleChange={this.onChange}
            label="Name"
          />
          <Input
            errorMessage={errors.name}
            type="text"
            placeholder={username || ''}
            margin="1.2rem"
            name="username"
            id="username"
            value={Username}
            wrapper="input-div"
            handleChange={this.onChange}
            label="Username"
            width="85%"
          />
        </div>
        <div className="bio-form">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              name="bio"
              value={Bio}
              rows="3"
              placeholder={bio || ''}
              onChange={this.onChange}
            />
          </Form.Group>
        </div>
        <Button sm onClick={this.handleSubmit} disabled={!(Name && Username && Bio)}>
          Update
        </Button>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  userProfile: PropTypes.object,
  updateProfile: PropTypes.func,
  profileData: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  updateProfile: data => dispatch(updateUserProfile(data))
});

const mapStateToProps = state => ({
  userProfile: state.user.userData,
  profileData: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm);
