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

  render() {
    const content = this.content || this.state.content;
    const services = content && content.filter((entry) => {
      return entry.sys.contentType.sys.id === 'service';
    });
    const options = services && services.filter((service) => service.fields.title !== 'Description');
    const description = services && services.filter((service) => service.fields.title === 'Description');

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
            <h2>{description && description[0].fields.description}</h2>
            <div className="services__content--columns">
              {
                options && options.map((service, index) => {
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
}

export default Services;
