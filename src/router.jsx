'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Services from './pages/services/services.jsx';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/services' component={Services} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
