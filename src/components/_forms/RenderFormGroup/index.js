import React from 'react';

import { FormGroup } from '@blueprintjs/core';

const RenderFormGroup = (props) => {
  const {
    children,
    ...restProps
  } = props;

  return (
    <FormGroup {...restProps}>
      {children}
    </FormGroup>
  );
};

export default RenderFormGroup;
