import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ClockIcon from '../../assets/images/icons/clock.png';

const TimerComponent = ({ timeCount }) => (
  <Fragment>
    <span className="icon-holder">
      <img src={ClockIcon} alt="ClockIcon" className="icon-height" />
      <sub className="count">{timeCount}</sub>
    </span>
  </Fragment>
);

TimerComponent.propTypes = {
  timeCount: PropTypes.string.isRequired
};

export default TimerComponent;
