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
          <h1>The Beginning</h1>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
