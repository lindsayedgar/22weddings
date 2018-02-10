'use strict'

import axios from 'axios';

const Http = {};
const defaultHeaders = {};

Http.get = (url, headers = defaultHeaders) => {
  return axios({
    method: 'GET',
    url: url,
    headers: headers
  })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  })
}

Http.post = (url, data, headers = defaultHeaders) => {
  return axios({
    method: 'POST',
    url: url,
    data: data,
    headers: headers
  })
  .then((response) => response)
  .catch((error) => {
    throw error;
  })
}

Http.put = (url, data, headers = defaultHeaders) => {
  return axios({
    method: 'PUT',
    url: url,
    data: data,
    headers: headers
  })
  .then((response) => response)
  .catch((error) => {
    throw error;
  })
}

export default Http;
