import React from 'react';
import classNames from 'classnames/bind';
import s from './styles.css';

const cx = classNames.bind(s);

const Input = (props) => {
  const {
    tip,
    meta,
    ...restProps
  } = props;

  const renderTip = (tip) =>
    (tip && meta.dirty ? (<div className={s.tip}>{tip}</div>) : null);

  const className = cx(
    s.input,
    tip ? s.withTip : null,
    'pt-input',
    'pt-large'
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
