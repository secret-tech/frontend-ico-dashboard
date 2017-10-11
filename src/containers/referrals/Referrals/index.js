import React, { Component } from 'react';
import s from './styles.css';

import Address from '../../../components/referrals/Address';
import Counter from '../../../components/referrals/Counter';
import Users from '../Users';

class Referrals extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.address}>
            <Address address="https://jincor.com/hash"/>
          </div>

          <div className={s.users}>
            <Users/>
          </div>
        </div>
        <div className={s.col}>
          <Counter
            openEmbedCode={() => { console.log('open popup'); }}
            earned={150}
            referralsQty={2}/>
        </div>
      </div>
    );
  }
}

export default Referrals;
