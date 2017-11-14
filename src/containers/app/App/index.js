import React, { Component } from 'react';
import { connect } from 'react-redux';

import { checkAuth } from '../../../redux/modules/app/app';

import Notifications from '../Notifications';

class App extends Component {
  componentWillMount() {
    this.props.checkAuth();
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
        <Notifications/>
      </div>
    );
  }
}

export default connect(null, { checkAuth })(App);
