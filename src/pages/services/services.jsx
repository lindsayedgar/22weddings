'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';
import content from '../../actions/content';

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
      <React.Fragment>
        <Header />
        <div className="services">
          <h1>Services we offer</h1>
          <div className="services__images">
            {
              [0, 0, 0, 0].map((item, index) => {
                return (
                  <div key={index} className="box">
                    <div className="box__container">
                      <img src="https://www.snowbird.com/uploaded/GROUPS/Weddings_Gina_Sean_0855.jpg" />
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="services__content">
            <span id="services" className="anchor"></span>
            <span id="testimonials" className="anchor"></span>
            <h2>This is a short description of the services that are offered.. blah blah blah.. put something here you bimbo</h2>
            <div className="services__content--columns">
              {
                services && services.map((service, index) => {
                  return (
                    <div key={index} className="services__content--columns--column">
                      <h2>{service.fields.title}</h2>
                      <p>{service.fields.description}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>

          {/* <section className="testimonial-list">
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
          </section> */}
        </div>
      </React.Fragment>
    )
  }

  getContent = () => {
    if (window.localStorage.content) {
      this.content = JSON.parse(window.localStorage.content);
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
}

export default Services;
