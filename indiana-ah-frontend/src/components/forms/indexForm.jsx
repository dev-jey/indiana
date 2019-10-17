import React, { Component } from 'react';
import Input from '../common/input/InputComponent.jsx';
import Button from '../../styles/styledComponents/Button.jsx';

class IndexForm extends Component {
  state = {
    email: ''
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return <div className='sub-form'>
      <Input placeholder='Email' type='email' margin='1.2rem' name='email'
        id='email2' value={this.state.email} wrapper='input-div'
        handleChange={this.onChange} />
      <Button inlineButton bgColor>Subscribe</Button>
    </div>;
  }
}

export default IndexForm;
