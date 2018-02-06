'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';
import Profile from '../../img/profile.jpg';

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
          <div className="content">
            <span id="aboutme" className="anchor"></span>
            <div className="about">
              <div className="img">
                <img src={Profile} />
              </div>
              <div className="text">
                <h1>About Lindsay</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
