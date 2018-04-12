import React, { Component } from 'react';
import classnames from 'classnames/bind';

import { Button } from '@blueprintjs/core';

import s from './styles.scss';

class RenderPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { type: 'password' };
  }

  render() {
    const {
      label,
      input,
      meta,
      icon,
      size,
      tip,
      ...restProps
    } = this.props;

    const {
      error,
      invalid,
      active,
      dirty
    } = meta;

    const isInvalid = () => {
      if (!active && invalid && dirty) return true;
      if (!invalid) return false;

      return null;
    };

    const inputClassName = classnames(
      'pt-input',
      'pt-fill',
      isInvalid() ? 'pt-intent-danger' : null
    );

    const formGroupClassName = classnames(
      'pt-form-group',
      isInvalid() ? 'pt-intent-danger' : null
    );

    const buttonClassName = classnames(
      'pt-button',
      size === 'pt-large' ? 'pt-large' : null
    );

    const renderButton = () => {
      if (this.state.type === 'password') {
        return (
          <Button
            className={buttonClassName}
            icon="eye-open"
            onClick={() => this.setState({ type: 'text' })}/>
        );
      }

      return (
        <Button
          className={buttonClassName}
          icon="eye-off"
          onClick={() => this.setState({ type: 'password' })}/>
      );
    };

    return (
      <div className={formGroupClassName}>
        {label
          ? (<label className="pt-label">
              {label}
            </label>)
          : null}

        <div className="pt-control-group">
          <div className="pt-input-group pt-fill">
            <div className="pt-form-content">
              <input className={inputClassName} {...input} {...restProps} type={this.state.type}/>
              {isInvalid() ? <div className="pt-form-helper-text">{error}</div> : null}
            </div>
          </div>
          {renderButton()}
        </div>

        {!tip ? null : (<div className={s.tip}>
          Password must be at least 8 characters length, contain at
          least one number, one capital letter, one small letter.
          Special characters are allowed.
        </div>)}
      </div>
    );
  }
}

export default RenderPassword;
