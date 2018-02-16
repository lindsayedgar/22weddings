'use strict'

import http from './http.js'

const Content = {}

Content.getContent = () => {
  return http.get(`${constants.API_BASE}content/getEntries`)
    .then((results) => {
      window.localStorage.setItem('content', JSON.stringify(results.items));
      return results.items;
    });
}

export default Content;
