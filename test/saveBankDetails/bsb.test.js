const { createPayload, testSaveBankDetails } = require('../../helper');

describe('Save Bank Details with bsb field', () => {
  describe('And bank country code - AU', () => {
    describe('And valid length', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      it(`Should accept bsb code '012345' of length 6 with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
        const payload = createPayload('LOCAL', 'AU', 'John Smith', '012345678');
        payload.bsb = '012345';
        return testSaveBankDetails(payload, OK, expectedResult);
      });
    });

    describe('And invalid length', () => {
      const expectedResult = { error: "Length of 'bsb' should be 6" };
      const BAD_REQUEST = 400;

      const accountArr = [
        { bsb: '01234', length: 5 },
        { bsb: '0123456', length: 7 }];

      accountArr.forEach(account => {
        it(`Should reject bsb code '${account.bsb}' of length ${account.length} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('LOCAL', 'AU', 'John Smith', '012345678');
          payload.bsb = account.bsb;
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe('And valid characters', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      const accountArr = [
        { bsb: '012345', testCase: 'numbers are acceptable' },
        { bsb: 'abcdef', testCase: 'alphabets are acceptable' },
        { bsb: '@!#$%^', testCase: 'special characters are acceptable' }];

      accountArr.forEach(account => {
        it(`Should accept bsb code '${account.bsb}' because ${account.testCase} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('LOCAL', 'AU', 'John Smith', '012345678');
          payload.bsb = account.bsb;
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And empty bsb', () => {
      const expectedResult = { error: "'bsb' is required when bank country code is 'AU'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'AU', 'John Smith', '012345678');
        payload.bsb = '';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And missing bsb', () => {
      const expectedResult = { error: "'bsb' is required when bank country code is 'AU'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'AU', 'John Smith', '012345678');
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });

  describe('And bank country code - US', () => {
    describe('And no bsb', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      it(`Should accept with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
        const payload = createPayload('LOCAL', 'US', 'John Smith', '012345678');
        payload.aba = '012345678';
        return testSaveBankDetails(payload, OK, expectedResult);
      });
    });
  });

  describe('And bank country code - CN', () => {
    describe('And no bsb', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      it(`Should accept with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
        const payload = createPayload('LOCAL', 'CN', 'John Smith', '012345678');
        return testSaveBankDetails(payload, OK, expectedResult);
      });
    });
  });
});
