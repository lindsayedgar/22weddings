'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';
import Footer from '../shared/footer/footer.jsx';
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
    const options = services && services.filter((service) => service.fields.title !== 'Description' && service.fields.title !== 'Images');
    const description = services && services.filter((service) => service.fields.title === 'Description');
    const images = services && services.filter((service) => service.fields.title === 'Images');
    options.sort((a, b) => {
      return a.fields.position - b.fields.position;
    });

    return (
      <React.Fragment>
        <Header />
        <div className="services">
          <h1>Services we offer</h1>
          <div className="services__images">
            {
              images && images[0].fields.images.map((item, index) => {
                return (
                  <div key={index} className="box">
                    <div className="box__container">
                      <img src={item.fields.file.url} />
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
        <Footer />
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
