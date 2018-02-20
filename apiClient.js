const axios = require('axios');
const serverAddr = process.env.API_ENDPOINT;
const saveBankDetailsEndPoint = '/bank';

const http = axios.create({
  baseURL: serverAddr,
  headers: { 'content-type': 'application/json' }
});

const saveBankDetails = payload => {
  if (typeof serverAddr === 'undefined') {
    throw new Error('Please define API_ENDPOINT');
  }

  return http.post(saveBankDetailsEndPoint, payload)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error.response;
    });
};

module.exports = {
  saveBankDetails
};
