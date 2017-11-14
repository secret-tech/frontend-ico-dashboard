import React from 'react';
import classNames from 'classnames/bind';
import s from './styles.css';

const cx = classNames.bind(s);

const Input = (props) => {
  const {
    invalid,
    size,
    tip,
    meta,
    ...restProps
  } = props;

  const getSize = (val) => {
    switch (val) {
      case 'large':
        return s.large;
      default:
        return null;
    }
  };

  const renderTip = (tip) =>
    (tip && meta.dirty ? (<div className={s.tip}>{tip}</div>) : null);

  const className = cx(
    s.input,
    getSize(size),
    tip ? s.withTip : null
  );

  return (
    <div className={s.wrapper}>
      <input
        className={className}
        {...restProps}/>
      {renderTip(tip)}
    </div>
  );
};

export default Input;
