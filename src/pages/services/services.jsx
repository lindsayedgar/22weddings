'use strict';

import React from 'react';
import http from '../../actions/http';

class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null
    };
  }

  componentWillMount() {
    this.getContent();
  }

  render() {
    const services = this.state.content && this.state.content.filter((entry) => {
      return entry.sys.contentType.sys.id === 'service';
    });
    const testimonials = this.state.content && this.state.content.filter((entry) => {
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
        <section className="testimonial-list">
          <span id="testimonials" className="anchor"></span>
          <h1>Testimonials</h1>
          {
            testimonials && testimonials.map((testimonial, key) => {
              const url = testimonial.fields.reference.fields.image.fields.file.url;
              return (
                <div key={key}>
                  <img src={`https:${url}`} />
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
    http.get(constants.routes.GET_CONTENT)
      .then((results) => {
        this.setState({
          content: results.items
        });
      });
  }
}

export default Services;
