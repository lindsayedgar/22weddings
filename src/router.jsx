'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Home from './pages/home/home.jsx';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePageUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Router onUpdate={this.handlePageUpdate} history={browserHistory}>
        <Route path='/' component={Home} />
      </Router>
    );
  }
}

export default AppRouter;
