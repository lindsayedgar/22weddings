'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';
import Footer from '../shared/footer/footer.jsx';
import content from '../../actions/content';

class Testimonials extends React.Component {
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
    const testimonials = content && content.filter((entry) => {
      return entry.sys.contentType.sys.id === 'testimonial';
    });

    return (
      <React.Fragment>
        <Header />
        <div className="testimonials">
          <h1>Testimonials</h1>
          <div className="testimonials__images">

          </div>
          <section className="testimonial-list">
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

export default Testimonials;
