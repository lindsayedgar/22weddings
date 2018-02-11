'use strict';

import React from 'react';
import { TextField, FlatButton } from 'material-ui';
import http from '../../actions/http';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      underlineStyle: {
        borderColor: '#F26B4D'
      }
    };
    this.state = {
      content: {
        '3IsXIg0cVy68kKaOoOQYsO': {
          title: null,
          text: null
        },
        '1HyLoi3scA46sqKwm2KU4I': {
          title: null,
          text: null
        },
        '7rBv2VPOeWMOeCmoSAmGuG': {
          title: null,
          text: null
        }
      }
    };
  }

  componentWillMount() {
    this.getContent();
  }

  render() {
    return (
      <div className="home">
        <div className="parallax"></div>
        <div className="content">
          <div className="flex">
            <span id="about" className="anchor"></span>
            <div className="about">
              <h1>{this.state.content['3IsXIg0cVy68kKaOoOQYsO'].title}</h1>
              <p>{this.state.content['3IsXIg0cVy68kKaOoOQYsO'].text}</p>
            </div>
            <div className="services-home">
              <h1>{this.state.content['1HyLoi3scA46sqKwm2KU4I'].title}</h1>
              <p>{this.state.content['1HyLoi3scA46sqKwm2KU4I'].text}</p>
            </div>
          </div>
          <div className="contact">
            <div className="flex">
              <div className="testimonials">
                <h1>{this.state.content['7rBv2VPOeWMOeCmoSAmGuG'].title}</h1>
                <p>{this.state.content['7rBv2VPOeWMOeCmoSAmGuG'].text}</p>
              </div>
              <div className="form">
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
                <span id="contact" className="anchor"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getContent = () => {
    http.get(constants.routes.GET_CONTENT)
      .then((results) => {
        let stateObj = this.getContentState();
        results.items.map((entry) => {
          if (Object.keys(stateObj).indexOf(entry.sys.id) !== -1) {
            stateObj[entry.sys.id].title = entry.fields.title;
            stateObj[entry.sys.id].text = entry.fields.description;
          }
        });
        this.setState({
          content: stateObj
        });
      });
  }

  getContentState = () => {
    return Object.assign({}, this.state.content);
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log('testing form');
  }
}

export default Home;
