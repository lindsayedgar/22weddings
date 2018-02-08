'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';

class Services extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="services">
          <p>Testing</p>
        </div>
      </React.Fragment>
    )
  }
}

export default Services;
