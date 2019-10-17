import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Index from './IndexPage.jsx';
import PersonalisedView from './personalised/Index.jsx';

const Home = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) return <PersonalisedView />;
  return <Index />;
};

Home.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export { Home };

export default connect(mapStateToProps)(Home);
