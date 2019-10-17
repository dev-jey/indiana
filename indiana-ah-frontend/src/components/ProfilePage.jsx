import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FadingCircle } from 'better-react-spinkit';
import PropTypes from 'prop-types';
import {
  verified, checkMark, mail, camera
} from '../assets/images/svg';
import Profiletab from './Tabs/Tabs.jsx';
import SideNav from './SideNav.jsx';
import {
  getUserProfile,
  updateEmailNotification,
  updateProfilePic
} from '../redux/actions/profileActions';

export class ProfilePage extends Component {
  state = {
    profile: '',
    image: '',
    checked: this.props.user.userData.subscribed
  };

  componentDidMount = async () => {
    document.body.style.marginBottom = '0';
    await this.props.getUserProfile();
  };

  componentWillUnmount() {
    document.body.style.marginBottom = '30rem';
  }

  handleProfileImageUpload = async (e) => {
    await this.setState({
      image: e.target.files[0]
    });
    const { image } = this.state;
    if (image) {
      this.props.updateProfilePic(image);
    }
  };

  handleToggle = () => {
    this.setState({
      checked: !this.state.checked
    });
    this.props.updateEmailNotification();
  };

  render() {
    const { userData, isLoading: loading } = this.props.user;
    return (
      <div className="main">
        <SideNav />
        <section className="container-fluid profile">
          {loading && (
            <div className="loader">
              <FadingCircle className="loader-pic" size={100} color="white" />
            </div>
          )}
          <Row className="mb-5">
            <div className="col-md-4 col-sm-5 profile-card text-center profile-info">
              <h5>Profile</h5>
              <div>
                <img
                  src={userData.imageUrl}
                  alt="Profile Picture"
                  className="profile-pic"
                />
                <span>
                  <label htmlFor="file">
                    <img src={camera} alt="camera" className="camera" />
                  </label>
                  <input
                    id="file"
                    onChange={this.handleProfileImageUpload}
                    type="file"
                    ref={(input) => {
                      this.inputElement = input;
                    }}
                  />
                </span>
              </div>
              <h5 className="black">{userData.username.replace(/\d{5,}/, '')}</h5>
            </div>
            <div className="space-sm col-md-1 col-sm-1" />
            {userData.bio && userData.name ? (
              <div className="col-md-7 col-sm-6 profile-card finished" />
            ) : (
              <div className="col-md-7 col-sm-6 profile-card verified">
                <h5 className="d-inline-block mb-30 mr-3 black">
                  Your account has been verified
                </h5>
                <img
                  src={checkMark}
                  alt="Check Mark"
                  className="d-none d-md-inline-block"
                />
                <p className="mb-48">Your profile is yet to be completed</p>
                <img src={verified} alt="verified" className="check-line" />
                <div className="mt-3">
                  <h6 className="d-inline-block mr-5">Registered</h6>
                  <h6 className="d-inline-block mr-6">Verified</h6>
                  <h6 className="d-inline-block">Profile 100%</h6>
                </div>
              </div>
            )}
          </Row>
          <Row>
            <div className="col-md-4 profile-card text-center mail order-3 order-md-4">
              <div>
                <img src={mail} alt="mail icon" className="d-block m-auto mail-ico" />
              </div>
              <h3 className="mail-text">Subscribe To Email Notification</h3>
              <h6>To recieve app notifications in your email</h6>
              <div className="subscribe">
                <form>
                  <input
                    type="checkbox"
                    onChange={this.handleToggle}
                    checked={this.state.checked || false}
                    id="subscribe"
                    name="subscribe"
                    className="mr-3"
                  />
                  <label htmlFor="subscribe" className="black">
                    Subscribe
                  </label>
                </form>
              </div>
            </div>
            <div className="space col-md-1 order-2 order-md-4" />
            <div className="col-md-7 tabs profile-card order-1 order-md-4">
              <Profiletab userProfile={userData} />
            </div>
          </Row>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

ProfilePage.propTypes = {
  user: PropTypes.object,
  getUserProfile: PropTypes.func,
  updateEmailNotification: PropTypes.func,
  updateProfilePic: PropTypes.func
};

export default connect(
  mapStateToProps,
  {
    getUserProfile,
    updateEmailNotification,
    updateProfilePic
  }
)(ProfilePage);
