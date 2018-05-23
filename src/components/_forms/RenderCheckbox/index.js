import React from 'react';
import { Checkbox, FormGroup, Intent } from '@blueprintjs/core';

const RenderCheckbox = (props) => {
  const {
    meta,
    input,
    label,
    checkboxLabel,
    tip,
    ...restProps
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

      <Checkbox
        {...restProps}
        {...input}
        label={checkboxLabel}
        intent={isInvalid() ? Intent.DANGER : Intent.NONE}/>
    </FormGroup>
  );
};

export default RenderCheckbox;
