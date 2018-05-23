import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import RenderInput from '../RenderInput';

class RenderPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { type: 'password' };
  }

  render() {
    const renderButton = () => (this.state.type === 'password'
      ? <Button minimal icon="eye-open" onClick={() => this.setState({ type: 'text' })}/>
      : <Button minimal icon="eye-off" onClick={() => this.setState({ type: 'password' })}/>);

    return (
      <RenderInput {...this.props} rightElement={renderButton()} type={this.state.type}/>
    );
  }
}

export default RenderPassword;
