'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './pages/shared/header/header.jsx';
import Home from './pages/home/home.jsx';
import Services from './pages/services/services.jsx';

const routeChange = () => {
  console.log('testing');
  return null;
}

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/services' component={Services} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
