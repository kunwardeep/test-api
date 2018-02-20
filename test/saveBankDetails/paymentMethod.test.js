const { createPayload, testSaveBankDetails } = require('../../helper');

describe('Save Bank Details with payment_method field', () => {
  describe('And valid payment method', () => {
    const expectedResult = { success: 'Bank details saved' };
    const OK = 200;

    it(`Should accept payment method - SWIFT with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
      const payload = createPayload('SWIFT', 'US', 'John Smith', '123');
      payload.swift_code = 'ICBKUSBJ';
      return testSaveBankDetails(payload, OK, expectedResult);
    });

    it(`Should accept payment method - LOCAL with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
      const payload = createPayload('LOCAL', 'US', 'John Smith', '123');
      return testSaveBankDetails(payload, OK, expectedResult);
    });
  });

  describe('And invalid payment method', () => {
    const expectedResult = { error: '\'payment_method\' field required, the value should be either \'LOCAL\' or \'SWIFT\'' };
    const BAD_REQUEST = 400;

    it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
      const payload = createPayload('INVALID', 'US', 'John Smith', '123');
      return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
    });
  });

  describe('And empty payment method', () => {
    const expectedResult = { error: '\'payment_method\' field required, the value should be either \'LOCAL\' or \'SWIFT\'' };
    const BAD_REQUEST = 400;

    it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
      const payload = createPayload('', 'US', 'John Smith', '123');
      return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
    });
  });

  describe('And missing payment method', () => {
    const expectedResult = { error: '\'payment_method\' field required, the value should be either \'LOCAL\' or \'SWIFT\'' };
    const BAD_REQUEST = 400;

    it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
      const payload = createPayload('', 'US', 'John Smith', '123');
      delete payload.payment_method;
      return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
    });
  });
});
