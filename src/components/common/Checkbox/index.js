import React from 'react';
import s from './styles.css';

const Checkbox = (props) => {
  const { invalid, label, ...restProps } = props;

  return (
    <label className={s.checkbox}>
      <input className={s.input} {...restProps} type="checkbox" />
      <div className={s.box}/>
      {label}
    </label>
  );
};

export default Checkbox;
