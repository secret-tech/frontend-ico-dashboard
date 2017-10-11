import React from 'react';
import s from '../styles.css';

const EmailItem = ({ email, selected, ...divProps }) => (
  <div
    className={selected ? s.selected : s.emailitem}
    children={email}
    {...divProps}/>
);

export default EmailItem;
