const { createPayload, testSaveBankDetails } = require('../../helper');

describe('Save Bank Details with aba field', () => {
  describe('And bank country code - US', () => {
    describe('And valid length', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      it(`Should accept bsb code '012345678' of length 9 with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
        const payload = createPayload('LOCAL', 'US', 'John Smith', '012345678');
        payload.aba = '012345678';
        return testSaveBankDetails(payload, OK, expectedResult);
      });
    });

    describe('And invalid length', () => {
      const expectedResult = { error: "Length of 'aba' should be 9" };
      const BAD_REQUEST = 400;

      const accountArr = [
        { aba: '01234567', length: 8 },
        { aba: '0123456789', length: 10 }];

      accountArr.forEach(account => {
        it(`Should reject aba code '${account.aba}' of length ${account.length} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('LOCAL', 'US', 'John Smith', '012345678');
          payload.aba = account.aba;
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe('And valid characters', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      const accountArr = [
        { aba: '012345678', testCase: 'numbers are acceptable' },
        { aba: 'abcdefghi', testCase: 'alphabets are acceptable' },
        { aba: '@!#$%^&()', testCase: 'special characters are acceptable' }];

      accountArr.forEach(account => {
        it(`Should accept aba code '${account.aba}' because ${account.testCase} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('LOCAL', 'US', 'John Smith', '012345678');
          payload.aba = account.aba;
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And empty aba', () => {
      const expectedResult = { error: "'aba' is required when bank country code is 'US'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'US', 'John Smith', '012345678');
        payload.aba = '';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And missing aba', () => {
      const expectedResult = { error: "'aba' is required when bank country code is 'US'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'US', 'John Smith', '012345678');
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });

  describe('And bank country code - AU', () => {
    describe('And no aba', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      it(`Should accept with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
        const payload = createPayload('LOCAL', 'AU', 'John Smith', '012345678');
        payload.bsb = '012345';
        return testSaveBankDetails(payload, OK, expectedResult);
      });
    });
  });

  describe('And bank country code - CN', () => {
    describe('And no aba', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      it(`Should accept with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
        const payload = createPayload('LOCAL', 'CN', 'John Smith', '012345678');
        return testSaveBankDetails(payload, OK, expectedResult);
      });
    });
  });
});
