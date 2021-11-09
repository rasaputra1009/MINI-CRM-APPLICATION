import axios from 'axios';

function extractData({ status, data }) {
  if (status === 204 || status === 205) {
    return null;
  }

  return data;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  return axios
    .get(url, options)
    .then(checkStatus)
    .then(extractData);
}
