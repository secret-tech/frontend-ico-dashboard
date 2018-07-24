import React from 'react';
import { NumericInput, FormGroup, Intent } from '@blueprintjs/core';

const RenderNumericInput = (props) => {
  const {
    meta,
    input,
    label,
    tip,
    ...restProps
  } = props;

  console.log(props);

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

      <NumericInput
        {...restProps}
        {...input}
        intent={isInvalid() ? Intent.DANGER : Intent.NONE}/>
    </FormGroup>
  );
};

export default RenderNumericInput;
