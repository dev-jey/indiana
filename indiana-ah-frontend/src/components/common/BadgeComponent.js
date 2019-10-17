import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import { NavLink } from 'react-router-dom';

const BadgeComponent = ({ eachTagDetail }) => (
  <Fragment>
    <NavLink to={`/search?tag=${eachTagDetail}`}>
      <Badge variant="secondary" className="mr-2">
        {eachTagDetail}
      </Badge>
    </NavLink>
  </Fragment>
);

BadgeComponent.propTypes = {
  eachTagDetail: PropTypes.string.isRequired
};

export default BadgeComponent;
