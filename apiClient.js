const axios = require('axios');
const serverAddr = process.env.API_ENDPOINT;
// const serverAddr = 'http://preview.airwallex.com:30001';

const saveBankDetailsEndPoint = '/bank';

const http = axios.create({
  baseURL: serverAddr,
  headers: { 'content-type': 'application/json' }
});

const saveBankDetails = payload => {
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
