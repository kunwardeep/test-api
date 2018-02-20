const { saveBankDetails } = require('./apiClient');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const createPayload = (payment_method, bank_country_code, account_name, account_number) => {
  return {
    payment_method,
    bank_country_code,
    account_name,
    account_number
  };
};

const testSaveBankDetails = (payload, statusCode, expectedResult) => {
  return saveBankDetails(payload)
    .then(response => {
      expect(response.data).to.deep.equal(expectedResult);
      expect(response.status).to.equal(statusCode);
    });
};

module.exports = {
  createPayload, testSaveBankDetails
};
