import React from 'react';
import s from './styles.css';

const Spinner = () => (
  <div className={s.spinner}>
    <div className={s.bounceOne}></div>
    <div className={s.bounceTwo}></div>
    <div className={s.bounceThree}></div>
  </div>
);

export default Spinner;
