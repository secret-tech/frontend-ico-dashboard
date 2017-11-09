import React from 'react';
import { Link, IndexLink } from 'react-router';
import s from './styles.css';
import { namedRoutes } from '../../../routes';

const Sidebar = () => (
  <div className={s.sidebar}>
    <div className={s.logo}>
      <img src={require('../../../assets/images/logo.svg')} alt="Jincor"/>
    </div>

    <div className={s.navigation}>
      <IndexLink
        className={s.link}
        activeClassName={s.active}
        to={namedRoutes.dashboard}>Dashboard</IndexLink>

      <Link
        className={s.link}
        activeClassName={s.active}
        to={namedRoutes.transactions}>Transactions</Link>

      <Link
        className={s.link}
        activeClassName={s.active}
        to={namedRoutes.referrals}>Referrals</Link>

      <Link
        className={s.disabled}
        activeClassName={s.active}
        to={namedRoutes.sendTokens}>Send Tokens</Link>

      <Link
        className={s.link}
        activeClassName={s.active}
        to={namedRoutes.account}>Account</Link>

      <Link
        className={s.disabled}
        activeClassName={s.active}
        to={namedRoutes.verification}>Verification</Link>
    </div>

    <div className={s.socials}>
      <a href="http://t.me/jincorICOeng" target="_blank">
        <img src={require('../../../assets/images/social-icons/telegram.svg')}/>
      </a>
      <a href="https://www.facebook.com/jincorlimited/" target="_blank">
        <img src={require('../../../assets/images/social-icons/facebook.svg')}/>
      </a>
      <a href="https://twitter.com/jincor_ico" target="_blank">
        <img src={require('../../../assets/images/social-icons/twitter.svg')}/>
      </a>
    </div>
  </div>
);

export default Sidebar;
