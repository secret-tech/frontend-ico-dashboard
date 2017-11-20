import React from 'react';
import s from './styles.css';

import Pagename from '../Pagename';

const Topbar = ({ pathname, openSidebar }) => (
  <div className={s.topbar}>
    <div className={s.title}><Pagename pathname={pathname}/></div>
    <div className={s.faq}>
      <a href="https://s3.eu-west-2.amazonaws.com/jincor-ico/docs/jincor_contributor_account_faq.pdf" target="_blank">
        <img src={require('../../../assets/images/icons/faq.svg')}/> FAQ
      </a>
    </div>
    <div className={s.button}>
      <button onClick={() => openSidebar()}>
        <img src={require('../../../assets/images/icons/burger.svg')}/>
      </button>
    </div>
  </div>
);

export default Topbar;
