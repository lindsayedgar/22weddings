'use strict'

import './styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.jsx';
import { MuiThemeProvider } from 'material-ui/styles';

const Main = (
  <MuiThemeProvider>
    <Router />
  </MuiThemeProvider>
);

ReactDOM.render(Main, document.getElementById('container'));
