'use strict'

import './styles/main.scss';
import favicon from './img/favicon.ico';

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import Router from './router.jsx';
import content from './actions/content.js';

content.getContent();

const Main = (
  <MuiThemeProvider>
    <Router />
  </MuiThemeProvider>
);

ReactDOM.render(Main, document.getElementById('container'));
