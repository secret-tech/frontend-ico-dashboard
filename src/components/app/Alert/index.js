import React from 'react';
import s from './styles.css';

const Alert = (props) => {
  const { children } = props;

  return (
    <div className={s.alert}>
      {children}
    </div>
  );
};

export default Alert;
