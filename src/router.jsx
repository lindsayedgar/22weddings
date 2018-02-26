'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/home/home.jsx';
import About from './pages/about/about.jsx';
import Services from './pages/services/services.jsx';

const toTop = () => {
  window.scroll(0, 0);
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
          <Switch>
            <Route exact={true} path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/services' component={Services} />
          </Switch>
          <Route path='/' component={toTop} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
