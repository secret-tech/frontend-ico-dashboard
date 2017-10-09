import React, { Component } from 'react';
import s from './styles.css';

class Password extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.setState((prevState) => ({ visible: !prevState.visible }));
  }

  render() {
    const { invalid, ...restProps } = this.props;
    const { visible } = this.state;

    return (
      <div className={s.wrap}>
        <input className={s.password} {...restProps} type={visible ? 'text' : 'password'}/>
        <img className={visible ? s.active : s.eye} src={require('./images/eye.svg')} onClick={this._handleClick}/>
      </div>
    );
  }
}

export default Password;
