const { createPayload, testSaveBankDetails } = require('../../helper');

describe('Save Bank Details with bank_country_code field', () => {
  describe('And valid bank country code', () => {
    const expectedResult = { success: 'Bank details saved' };
    const OK = 200;

    it(`Should accept bank country code - US with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
      const payload = createPayload('LOCAL', 'US', 'John Smith', '123');
      return testSaveBankDetails(payload, OK, expectedResult);
    });

    it(`Should accept bank country code - AU with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
      const payload = createPayload('LOCAL', 'AU', 'John Smith', '1234567');
      payload.bsb = '123456';
      return testSaveBankDetails(payload, OK, expectedResult);
    });

    it(`Should accept bank country code - CN with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
      const payload = createPayload('LOCAL', 'CN', 'John Smith', '12345678');
      return testSaveBankDetails(payload, OK, expectedResult);
    });
  });

  describe('And invalid bank country code', () => {
    const expectedResult = { error: "'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'" };
    const BAD_REQUEST = 400;

    it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
      const payload = createPayload('LOCAL', 'U', 'John Smith', '123');
      return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
    });
  });

  describe('And empty bank country code', () => {
    const expectedResult = { error: "'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'" };
    const BAD_REQUEST = 400;

    it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
      const payload = createPayload('LOCAL', '', 'John Smith', '123');
      return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
    });
  });

  describe('And missing bank country code', () => {
    const expectedResult = { error: "'bank_country_code' is required, and should be one of 'US', 'AU', or 'CN'" };
    const BAD_REQUEST = 400;

    it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
      const payload = createPayload('LOCAL', '', 'John Smith', '123');
      delete payload.bank_country_code;
      return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
    });
  });
});
