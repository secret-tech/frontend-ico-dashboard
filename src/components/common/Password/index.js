import React, { Component } from 'react';
import { Icon } from '@blueprintjs/core';
import classNames from 'classnames/bind';
import s from './styles.css';

const cx = classNames.bind(s);

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.setState((prevState) => ({ visible: !prevState.visible }));
  }

  render() {
    const { invalid, valid, ...restProps } = this.props;
    const { visible } = this.state;

    const getIconName = () => (
      visible ? 'eye-off' : 'eye-open'
    );

    const wrapperClassName = cx(
      'pt-input-group',
      'pt-large',
      s.wrap
    );

    const inputClassName = cx(
      s.password,
      'pt-input',
      invalid ? 'pt-intent-danger' : null
    );

    return (
      <div className={wrapperClassName}>
        <input className={inputClassName} {...restProps} type={visible ? 'text' : 'password'}/>
        <div className="pt-button pt-minimal pt-intent-warning" onClick={this._handleClick}><Icon icon={getIconName()}/></div>
      </div>
    );
  }
}

export default Password;
