import React, { Component } from 'react';
import { Tabs, Tab, Row } from 'react-bootstrap';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../styles/styledComponents/Button.jsx';
import Profileform from '../forms/profileForm.jsx';
import Passwordform from '../forms/passwordForm.jsx';
import { formatDate } from '../../utils/index';
import { updateInAppNotification } from '../../redux/actions/profileActions';

export class ProfileTab extends Component {
  state = {
    checked: this.props.userProfile.inAppNotification
  };

  handleChange = () => {
    this.setState({
      checked: !this.state.checked
    });
    this.props.updateInAppNotifications();
  };

  render() {
    const {
      userProfile: {
        bio, email, createdAt, name, username
      }
    } = this.props;
    return (
      <Tabs defaultActiveKey="Personal-Details" id="uncontrolled-tab-example">
        <Tab eventKey="Personal-Details" title="Personal Details">
          <div>
            <Row className="personal-details">
              <div className="col-sm-4 col-md-4">
                <h6 className="pb-15">Name</h6>
                <h5 className="black">{name || 'None'}</h5>
              </div>
              <div className="col-sm-4 col-md-4">
                <h6 className="pb-15">Email</h6>
                <h5 className="black">{email}</h5>
              </div>
              <div className="col-sm-4 col-md-4">
                <h6 className="pb-15">Date Registered</h6>
                <h5 className="black">{formatDate(createdAt)}</h5>
              </div>
            </Row>
            <Row className="bio">
              <div className="col-md-11">
                <h6 className="pb-15">Bio</h6>
                <h5 className="black bio-text">{bio || 'None'}</h5>
              </div>
            </Row>
          </div>
        </Tab>
        <Tab eventKey="Update-Details" title="Update Details">
          <Row className="w-100">
            <div className="update-details">
              <Profileform name={name} bio={bio} username={username} />
              <Passwordform />
            </div>
          </Row>
        </Tab>
        <Tab eventKey="Settings" title="Settings">
          <Row className="settings d-flex">
            <div className="col-md-6 notification-box text-center">
              <h3>Turn on Notifications</h3>
              <p>
                Subscribing to this service will alert you to events such as someone
                liking your article
              </p>
              <Switch
                onChange={this.handleChange}
                checked={this.state.checked || false}
              />
              {this.state.checked ? (
                <h3 className="mt-2 mb-0">Turn Off</h3>
              ) : (
                <h3 className="mt-2 mb-0">Turn On</h3>
              )}
            </div>
            <div className="col-md-6 deactivate text-center">
              <h3>Deactivate Your Account</h3>
              <p>
                Once Deactivated, you will not be able to access your account Ever Again
              </p>
              <Button danger sm>
                Deactivate
              </Button>
            </div>
          </Row>
        </Tab>
      </Tabs>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateInAppNotifications: () => dispatch(updateInAppNotification())
});

ProfileTab.propTypes = {
  updateInAppNotifications: PropTypes.func,
  userProfile: PropTypes.object,
  user: PropTypes.object
};

export default connect(null, mapDispatchToProps)(ProfileTab);
