import React, { cloneElement } from 'react';
import s from './styles.css';

const FieldError = ({ meta, children }) => {
  const {
    invalid,
    touched,
    active,
    error
  } = meta;
  const hasError = touched && !active && invalid;

  return (
    <div className={s.fieldElement}>
      {cloneElement(children, { invalid: hasError })}
      {hasError && <div className={s.error}>{error}</div>}
    </div>
  );
};

export default FieldError;
