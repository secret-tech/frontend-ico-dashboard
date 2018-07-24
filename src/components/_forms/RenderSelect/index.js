import React from 'react';
import classnames from 'classnames/bind';
import { FormGroup, Intent } from '@blueprintjs/core';

const cx = classnames.bind({});

const RenderSelect = (props) => {
  const {
    meta,
    input,
    label,
    tip,
    className,
    children
  } = props;

  const {
    error,
    active,
    invalid,
    visited
  } = meta;

  const isInvalid = () => {
    if (!active && invalid && visited) return true;
    if (!invalid) return false;
    return null;
  };

  return (
    <FormGroup
      label={label}
      helperText={isInvalid() ? error : tip}
      intent={isInvalid() ? Intent.DANGER : Intent.NONE}>

      <div className={cx('pt-select', className)}>
        <select className={className} {...input}>
          {children}
        </select>
      </div>
    </FormGroup>
  );
};

export default RenderSelect;
