'use strict';

import React from 'react';
import content from '../../actions/content';

class About extends React.Component {
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
    const about = content && content.filter((entry) => {
      return entry.sys.contentType.sys.id === 'about';
    });

    return (
      <div className="about-page">
        {about && about.map((about, key) => {
          const url = about.fields.reference.fields.image.fields.file.url;
          return (
            <div key={key} className="content">
              <h1>{about.fields.title}</h1>
              <div className="content__image">
                <img src={`https:${url}`} />
              </div>
              <div className="content__text">
                <p>{about.fields.description}</p>
              </div>
            </div>
          )
        })}
      </div>
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

export default About;
