import React from 'react';
import s from './styles.css';

const Topbar = ({ openSidebar }) => (
  <div className={s.topbar}>
    {/* <div className={s.faq}>
      <a href={Globals.faqLink} target="_blank">
        <img src={require('../../../assets/images/icons/faq.svg')}/> FAQ
      </a>
    </div> */}
    <div className={s.button}>
      <button onClick={() => openSidebar()}>
        <img src={require('../../../assets/images/icons/burger.svg')}/>
      </button>
    </div>
  </div>
);

export default Topbar;
