import React from 'react';
import classnames from 'classnames/bind';

const RenderInput = (props) => {
  const {
    label,
    input,
    meta,
    icon,
    ...restProps
  } = props;

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

  return (
    <div className={formGroupClassName}>
      {label
        ? (<label className="pt-label">
          {label}
        </label>)
        : null}
      <div className="pt-form-content">
        <input className={inputClassName} {...input} {...restProps}/>
        {isInvalid() ? <div className="pt-form-helper-text">{error}</div> : null}
      </div>
    </div>
  );
};

export default RenderInput;
