import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import {
  sideNavArticlesLogo,
  sideNavProfileLogo,
  sideNavStatisticsLogo
} from '../assets/images/svg';

const SideNav = () => (
  <div className="sidenav">
    <NavLink to="/profile" activeClassName="is-active" className="sidenav__logo-box">
      <img src={sideNavProfileLogo} className="sideNavLogos"/>
      <span className="sidenav__logo-label">Profile</span>
    </NavLink>
    <NavLink to="/dashboard/posts" activeClassName="is-active" className="sidenav__logo-box">
      <img src={sideNavArticlesLogo} className="sideNavLogos"/>
      <span className="sidenav__logo-label">Articles</span>
    </NavLink>
    <NavLink to="/statistics" activeClassName="is-active" className="sidenav__logo-box">
      <img src={sideNavStatisticsLogo} className="sideNavLogos" />
      <span className="sidenav__logo-label">Statistics</span>
    </NavLink>
    <Route path="/" />
  </div>
);

// #F8F9FF Background grey color to be used as container for sideNav component
// #FFFFFF SideNav background color
export default SideNav;
