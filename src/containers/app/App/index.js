import React, { Component } from 'react';
import { connect } from 'react-redux';

import { checkAuth } from '../../../redux/modules/app/app';

class App extends Component {
  componentWillMount() {
    this.props.checkAuth();
  }

  render() {
    const { children } = this.props;

    return (
      <div>{children}</div>
    );
  }
}

export default connect(null, { checkAuth })(App);
