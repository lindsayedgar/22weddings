'use strict';

import React from 'react';
import http from '../../actions/http';

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.content = null;
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
    const content = this.content || this.state.content;
    const services = content && content.filter((entry) => {
      return entry.sys.contentType.sys.id === 'service';
    });
    const testimonials = content && content.filter((entry) => {
      return entry.sys.contentType.sys.id === 'testimonial';
    });

    return (
      <div className="services">
        <section className="service-list">
          <span id="services" className="anchor"></span>
          <h1>Services</h1>
          {
            services && services.map((service, key) => {
              return (
                <div key={key}>
                  <h3>{service.fields.title}</h3>
                  <p>{service.fields.description}</p>
                </div>
              )
            })
          }
        </section>
        <span id="testimonials" className="anchor"></span>
        <section className="testimonial-list">
          <h1>Testimonials</h1>
          {
            testimonials && testimonials.map((testimonial, key) => {
              const url = testimonial.fields.reference.fields.image.fields.file.url;
              return (
                <div className="testimonial" key={key}>
                  <div className="padded-container">
                    <div className="padded-container__box">
                      <img src={`https:${url}`} />
                    </div>
                  </div>
                  <div className="review">
                    <h3>{testimonial.fields.title}</h3>
                    <p>{testimonial.fields.description}</p>
                  </div>
                </div>
              )
            })
          }
        </section>
      </div>
    )
  }

  getContent = () => {
    if (window.localStorage.content) {
      this.content = JSON.parse(window.localStorage.content);
      return;
    }

    http.get(`${constants.API_BASE}content/getEntries`)
      .then((results) => {
        this.setState({
          content: results.items
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
}

export default Services;
