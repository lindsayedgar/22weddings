'use strict';

import React from 'react';
import Header from '../shared/header/header.jsx';
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
    about.sort((a, b) => {
      return a.fields.position - b.fields.position;
    });

    return (
      <React.Fragment>
        <Header />
        <div className="about-page">
          <h1>About Twenty-Two Weddings</h1>
          {about && about.map((about, key) => {
            const url = about.fields.reference.fields.image.fields.file.url;
            return (
              <div key={key} className="content" image-first={about.fields.imageFirst.toString()}>
                <div className="content__image">
                  <img src={`https:${url}`} />
                  <span>{about.fields.caption}</span>
                </div>
                <div className="content__text">
                  <h3>{about.fields.title}</h3>
                  <p>{about.fields.description}</p>
                </div>
              </div>
            )
          })}
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

export default About;
