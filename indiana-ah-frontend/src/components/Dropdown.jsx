import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Dropdown extends React.Component {
  state = {
    displayMenu: false
  };

  showDropdownMenu = (event) => {
    event.preventDefault();
    if (!this.state.displayMenu) {
      this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
      });
    }
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  };

  render() {
    const { signOutUser } = this.props;
    return (
      <div className="dropdown">
        <i className="fa fa-caret-down" onClick={this.showDropdownMenu} />
        {this.state.displayMenu && (
          <ul>
            <Link to="/profile">
              <li>Profile </li>
            </Link>
            <Link to="/article/create">
              <li>Create Article </li>
            </Link>
            <Link to="/dashboard/posts">
              <li>My Articles </li>
            </Link>
            <Link to="/statistics">
              <li>My Stats </li>
            </Link>
            <Link
              to="/"
              onClick={() => {
                signOutUser();
              }}>
              <li>Logout</li>
            </Link>
          </ul>
        )}
      </div>
    );
  }
}

Dropdown.propTypes = {
  signOutUser: PropTypes.func
};
export default Dropdown;
