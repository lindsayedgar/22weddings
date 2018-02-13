'use strict';

import React from 'react';
import { TextField, FlatButton, DatePicker } from 'material-ui';
import http from '../../actions/http';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.info = null;
    this.styles = {
      underlineStyle: {
        borderColor: 'rgb(0, 188, 212)'
      }
    };
    this.state = {
      content: null
    };
  }

  componentWillMount() {
    this.getContent();
  }

  componentDidMount() {
    this.handleAnchor();
  }

  componentDidUpdate() {
    this.handleAnchor();
  }

  render() {
    const content = this.info || this.state.content;
    const about = content && content.filter((item) => { return item.sys.id === '3IsXIg0cVy68kKaOoOQYsO' });
    const services = content && content.filter((item) => { return item.sys.id === '1HyLoi3scA46sqKwm2KU4I' });
    const testimonials = content && content.filter((item) => { return item.sys.id === '7rBv2VPOeWMOeCmoSAmGuG' });

    return (
      <div className="home">
        <div className="parallax"></div>
        <div className="content">
          <div className="flex">
            <span id="about" className="anchor"></span>
            <div className="about">
              <h1>{about && about[0].fields.title}</h1>
              <p>{about && about[0].fields.description}</p>
            </div>
            <div className="services-home">
              <h1>{services && services[0].fields.title}</h1>
              <p>{services && services[0].fields.description}</p>
              <FlatButton label="View Services" onClick={() => { this.goToUrl('/services/#services') }} />
            </div>
          </div>
          <div className="contact">
            <div className="flex">
              <div className="testimonials">
                <h1>{testimonials && testimonials[0].fields.title}</h1>
                <p>{testimonials && testimonials[0].fields.description}</p>
                <FlatButton label="View Testimonials" onClick={() => { this.goToUrl('/services/#testimonials') }} />
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
                    hintText="Event Type"
                    underlineFocusStyle={this.styles.underlineStyle}
                  />
                  <br />
                  <DatePicker
                    className="input"
                    hintText="Select Date"
                    container="inline"
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
    if (window.localStorage.content) {
      const content = JSON.parse(window.localStorage.content);
      this.info = content.filter((entry) => {
        return entry.sys.contentType.sys.id === 'info';
      });
      return;
    }

    http.get(constants.routes.GET_CONTENT)
      .then((results) => {
        window.localStorage.setItem('content', JSON.stringify(results.items));
        const info = results.items.filter((entry) => {
          return entry.sys.contentType.sys.id === 'info';
        });
        this.setState({
          content: info
        });
      });
  }

  handleAnchor() {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      element.scrollIntoView(true);
    }
  }

  goToUrl(path) {
    window.location.href = `${window.location.origin}${path}`;
  }

  submitForm = (e) => {
    e.preventDefault();
    console.log('testing form');
  }
}

export default Home;
