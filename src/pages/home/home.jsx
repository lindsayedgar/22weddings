'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="home">
          <div className="parallax"></div>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
