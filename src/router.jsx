'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Route path='/' component={Home} />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
