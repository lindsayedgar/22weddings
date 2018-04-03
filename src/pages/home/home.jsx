'use strict';

import React from 'react';
import { TextField, FlatButton, DatePicker, Divider } from 'material-ui';
// import Carousel from 'nuka-carousel';
import { Carousel } from 'react-responsive-carousel';
import areIntlLocalesSupported from 'intl-locales-supported';
import Header from '../shared/header/header.jsx';
import Footer from '../shared/footer/footer.jsx';
import http from '../../actions/http';
import content from '../../actions/content';

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
    const carousel = content && content.filter((entry) => {
      return entry.sys.contentType.sys.id === 'carousel';
    });

    return content && (
      <React.Fragment>
        <Header page="home" />
        <div className="home">
          <div className="parallax"></div>
          <div className="content">
            <div className="summary">
              {
                [about, services, testimonials].map((item, index) => {
                  let color;
                  switch (index) {
                    case 1:
                      color = '#F26B4D';
                      break;
                    case 2:
                      color = '#58C3A2';
                      break;
                    default:
                      color = '#616161';
                      break;
                  }
                  const labels = ['see about', 'see services', 'see testimonials'];
                  const urls = ['/about', '/services', '/testimonials'];

                  return (
                    <div key={index} className="panel">
                      <h1 style={{color: color}}>{item[0].fields.title}</h1>
                      <p>{item[0].fields.description}</p>
                      <div>
                        <FlatButton
                          label={labels[index]}
                          style={{
                            borderColor: color,
                            borderStyle: 'solid',
                            borderWidth: '2px'
                          }}
                          labelStyle={{color: color}}
                          hoverColor={color}
                          onClick={() => { this.goToUrl(urls[index]) }} />
                      </div>
                      <Divider className="divider" alt={index} />
                    </div>
                  )
                })
              }
            </div>
            <div className="carousel">
              <Carousel>
                {
                  carousel && carousel[0].fields.images.map((image) => {
                    return (
                      <div>
                        <img src={image.fields.file.url} />
                      </div>
                    )
                  })
                }
              </Carousel>
            </div>
            <div className="contact">
              <div className="message">
                <h1>Send me a message</h1>
                <h1>& get in touch!</h1>
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
                    hintText="Event Type"
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
              </div>
            </div>
            <span id="contact" className="anchor"></span>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    ) || (<div></div>)
  }

  getContent = () => {
    if (window.localStorage.content) {
      this.info = JSON.parse(window.localStorage.content);
      return;
    }

    content.getContent()
      .then((res) => {
        this.setState({
          content: res
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
    this.clearForm(e);
  }
}

export default Home;
