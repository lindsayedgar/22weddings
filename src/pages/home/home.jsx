'use strict';

import React from 'react';
import { TextField, FlatButton, DatePicker } from 'material-ui';
import areIntlLocalesSupported from 'intl-locales-supported';
import http from '../../actions/http';

let DateTimeFormat;
// Use the native Intl.DateTimeFormat if available, or a polyfill if not.
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
  require('intl/locale-data/jsonp/fa-IR');
}

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
      content: null,
      form: {
        name: '',
        email: '',
        event: '',
        date: {},
        message: ''
      }
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
          <div className="row-flex">
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
          <div className="row-flex">
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
                  name="name"
                  hintText="Name"
                  underlineFocusStyle={this.styles.underlineStyle}
                  value={this.state.form.name}
                  onChange={this.handleFormChange}
                  required
                />
                <br />
                <TextField
                  className="input"
                  name="email"
                  hintText="Email"
                  underlineFocusStyle={this.styles.underlineStyle}
                  value={this.state.form.email}
                  onChange={this.handleFormChange}
                  required
                />
                <br />
                <TextField
                  className="input"
                  name="event"
                  hintText="Event Type (e.g. Wedding)"
                  underlineFocusStyle={this.styles.underlineStyle}
                  value={this.state.form.event}
                  onChange={this.handleFormChange}
                  required
                />
                <br />
                <DatePicker
                  className="input"
                  name="date"
                  hintText="Select Date"
                  container="inline"
                  formatDate={new DateTimeFormat('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }).format}
                  value={this.state.form.date}
                  onChange={this.handleDateChange}
                  required
                />
                <br />
                <TextField
                  className="input"
                  name="message"
                  hintText="Message"
                  multiLine={true}
                  rows={1}
                  rowsMax={10}
                  underlineFocusStyle={this.styles.underlineStyle}
                  value={this.state.form.message}
                  onChange={this.handleFormChange}
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

    http.get(`${constants.API_BASE}content/getEntries`)
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

  handleFormChange = (e) => {
    const form = Object.assign({}, this.state.form);
    form[e.target.name] = e.target.value;
    this.setState({
      form: form
    });
  }

  handleDateChange = (e, date) => {
    const form = Object.assign({}, this.state.form);
    form.date = date;
    this.setState({
      form: form
    });
  }

  goToUrl(path) {
    window.location.href = `${window.location.origin}${path}`;
  }

  clearForm = (e) => {
    e.preventDefault();
    const form = Object.assign({}, this.state.form);
    Object.keys(form).forEach((field) => {
      form[field] = field === 'date' ? {} : '';
    });
    this.setState({
      form: form
    });
  }

  sendEmail = (e) => {
    http.post(`${constants.API_BASE}sendEmail`, {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[5].value
    })
    .then((results) => {
      console.log(results);
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.sendEmail(e);
    // this.clearForm(e);
  }
}

export default Home;
