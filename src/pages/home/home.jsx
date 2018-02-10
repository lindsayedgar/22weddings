'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';
import { TextField, FlatButton } from 'material-ui';
import http from '../../actions/http';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.contentIds = [
      '7Cb6mNREJOQm8o8Ueys0YI',
      '6FtU5omrJKiig20EYIuCqK',
      '3tn9TUMPZ6SYuOAkSmWQO4'
    ];
    this.contentFuncs = this.contentIds.map((id) => {
      return http.post(constants.routes.GET_CONTENT, { entryId: id });
    });
    this.styles = {
      underlineStyle: {
        borderColor: '#F26B4D'
      }
    };
    this.state = {
      content: {
        aboutTitle: null,
        aboutText: null,
        servicesTitle: null,
        servicesText: null,
        testimonialsTitle: null,
        testimonialsText: null
      }
    };
  }

  componentWillMount() {
    this.getContent();
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
                <h1>{this.state.content.aboutTitle}</h1>
                <p>{this.state.content.aboutText}</p>
              </div>
              <div className="services-home">
                <h1>{this.state.content.servicesTitle}</h1>
                <p>{this.state.content.servicesText}</p>
              </div>
            </div>
            <div className="contact">
              <div className="flex">
                <div className="testimonials">
                  <h1>{this.state.content.testimonialsTitle}</h1>
                  <p>{this.state.content.testimonialsText}</p>
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

  getContent = () => {
    Promise.all(this.contentFuncs)
      .then((results) => {
        let about, services, testimonials;
        [about, services, testimonials] = results.map((res) => res.data.fields);
        const stateObj = {
          aboutTitle: about.title,
          aboutText: about.categoryDescription,
          servicesTitle: services.title,
          servicesText: services.categoryDescription,
          testimonialsTitle: testimonials.title,
          testimonialsText: testimonials.categoryDescription
        };
        this.setState({
          content: stateObj
        });
      });
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log('testing form');
  }
}

export default Home;
