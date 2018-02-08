'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';
import Profile from '../../img/profile.jpg';
import { TextField, FlatButton } from 'material-ui';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      underlineStyle: {
        borderColor: '#F26B4D'
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="home">
          <div className="parallax"></div>
          <div className="content">
            <div className="flex">
              <span id="about" className="anchor"></span>
              <div className="about">
                <h1>About Lindsay</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
              <div className="services-home">
                <h1>Services</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>
            </div>
            <div className="contact">
              <div className="contact__wrapper flex">
                <div className="testimonials">
                  <h1>Testimonials</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum
                  </p>
                </div>
                <div className="form">
                  <span id="contact" className="anchor"></span>
                  <p>Contact</p>
                  <form onSubmit={this.submitForm}>
                    <TextField
                      className="input"
                      hintText="Name"
                      underlineFocusStyle={this.styles.underlineStyle}
                      required
                    />
                    <br />
                    <TextField
                      className="input"
                      hintText="Email"
                      underlineFocusStyle={this.styles.underlineStyle}
                      required
                    />
                    <br />
                    <TextField
                      className="input"
                      hintText="Message"
                      multiLine={true}
                      rows={1}
                      rowsMax={10}
                      underlineFocusStyle={this.styles.underlineStyle}
                      required
                    />
                    <br />
                    <FlatButton label="Submit" type="Submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log('testing form');
  }
}

export default Home;
