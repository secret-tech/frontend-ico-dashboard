import React from 'react';
import s from './styles.css';

import Pagename from '../Pagename';

const Topbar = ({ pathname }) => (
  <div className={s.topbar}>
    <div className={s.title}><Pagename pathname={pathname}/></div>
    <div className={s.faq}>
      <a href="">FAQ</a>
    </div>
  </div>
);

export default Topbar;
