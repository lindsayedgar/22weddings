'use strict'

import './styles/main.scss';
import 'style-loader!css-loader!react-responsive-carousel/lib/styles/carousel.css';
import favicon from './img/favicon.ico';

import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import Router from './router.jsx';

const Main = (
  <MuiThemeProvider>
    <Router />
  </MuiThemeProvider>
);

ReactDOM.render(Main, document.getElementById('container'));
