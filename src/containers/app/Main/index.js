import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classnames from 'classnames/bind';

import { checkThemeState } from '../../../redux/modules/app/theme';

import AuthWrapper from '../AuthWrapper';
import AppWrapper from '../AppWrapper';
import AuthRoute from '../../../components/app/AuthRoute';
import AppRoute from '../../../components/app/AppRoute';
import Playground from '../../../components/_forms/Playground';

import * as routes from '../../../routes';
import config from '../../../utils/config';
import s from './styles.scss';

const cx = classnames.bind(s);

class Main extends Component {
  componentDidMount() {
    const { theme, checkThemeState } = this.props;
    checkThemeState();
    if (theme) document.body.className = theme;
  }

  componentWillReceiveProps(nextProps) {
    const { theme } = this.props;
    if (theme !== nextProps.theme) document.body.className = nextProps.theme;
  }

  render() {
    const {
      theme
    } = this.props;

    return (
      <div className={cx(s.app, theme)}>
        <Helmet>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <title>{config.appTitle}</title>
        </Helmet>

        <Switch>
          <Route path="/pg" component={Playground}/>
          <AuthRoute path={routes.AUTH} component={AuthWrapper}/>
          <AppRoute component={AppWrapper}/>
        </Switch>
      </div>
    );
  }
}

const ConnectedComponent = connect(
  (state) => ({
    ...state.app.theme
  }),
  {
    checkThemeState
  }
)(Main);
const ComponentWithRouter = withRouter(ConnectedComponent);
export default ComponentWithRouter;
