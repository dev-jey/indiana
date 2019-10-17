import React, { Component, Fragment } from 'react';
import Switch from 'react-switch';

class Toggler extends Component {
  state = {
    checked: false
  };

  handleChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Fragment>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
        {this.state.checked ? (
          <h3 className="mt-2 mb-0">Turn Off</h3>
        ) : (
          <h3 className="mt-2 mb-0">Turn On</h3>
        )}
      </Fragment>
    );
  }
}

export default Toggler;
