import React from 'react';
import { InputGroup, FormGroup, Intent } from '@blueprintjs/core';

const RenderInput = (props) => {
  const {
    meta,
    input,
    label,
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

      <InputGroup
        {...restProps}
        {...input}
        intent={isInvalid() ? Intent.DANGER : Intent.NONE}/>
    </FormGroup>
  );
};

export default RenderInput;
