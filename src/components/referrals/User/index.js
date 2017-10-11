import React from 'react';
import s from './styles.css';

const User = (props) => {
  console.log(props);

  return (
    <div className={s.user}>
      <div className={s.info}>
        <div className={s.date}>02/01/2017</div>
        <div className={s.name}>Peter Harrison</div>
        <div className={s.address}>
          <span>Wallet address —</span>
          <a href="https://etherscan.io" target="_blank">0x491be...53d7d43</a>
        </div>
      </div>
      <div className={s.tokens}></div>
    </div>
  );
};

export default User;
