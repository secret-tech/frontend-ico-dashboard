import React from 'react';
import s from './styles.css';

const Spinner = ({ color }) => (
  <div className={s.spinner}>
    <div className={s.bounceOne} style={{ backgroundColor: color }}></div>
    <div className={s.bounceTwo} style={{ backgroundColor: color }}></div>
    <div className={s.bounceThree} style={{ backgroundColor: color }}></div>
  </div>
);

export default Spinner;
