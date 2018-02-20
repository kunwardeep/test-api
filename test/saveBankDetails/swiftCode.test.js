const { createPayload, testSaveBankDetails } = require('../../helper');

describe('Save Bank Details with swift_code field', () => {
  describe('And bank country code - US', () => {
    describe('And valid length', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;
      const accountArr = [
        { code: 'ICBCUSBJ', length: 8 },
        { code: 'ICBCUSBJ012', length: 11 }];

      accountArr.forEach(account => {
        it(`Should accept swift code '${account.code}' of length ${account.length} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('SWIFT', 'US', 'John Smith', '012345678');
          payload.aba = '012345678';
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And invalid length', () => {
      const expectedResult = { error: "Length of 'swift_code' should be either 8 or 11" };
      const BAD_REQUEST = 400;

      const accountArr = [
        { code: 'ICBCUSB', length: 7 },
        { code: 'ICBCUSBJ0', length: 9 },
        { code: 'ICBCUSBJ01', length: 10 },
        { code: 'ICBCUSBJ0123', length: 12 }];

      accountArr.forEach(account => {
        it(`Should reject swift code '${account.code}' of length ${account.length} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('SWIFT', 'US', 'John Smith', '012345678');
          payload.aba = '012345678';
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe(`And missing bank country code 'US' in the 5th and 6th position in the swift code`, () => {
      const expectedResult = { error: 'The swift code is not valid for the given bank country code: US' };
      const BAD_REQUEST = 400;

      const accountArr = [
        { code: 'ICBCAUBJ', testCase: 'country code AU in the 5th and 6th position' },
        { code: 'ICBCCNBJ', testCase: 'country code CN in the 5th and 6th position' },
        { code: 'ICBCSABJ', testCase: 'non specific country code in in the 5 and 6th position' },
        { code: 'ICBUSCBJ', testCase: 'country code US in the 4th and 5th position' },
        { code: 'ICBCJUSC', testCase: 'country code US in the 6th and 7th position' }];

      accountArr.forEach(account => {
        it(`Should reject swift code '${account.code}', because ${account.testCase} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('SWIFT', 'US', 'John Smith', '012345678');
          payload.aba = '012345678';
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe('And empty swift code', () => {
      const expectedResult = { error: "'swift_code' is required when payment method is 'SWIFT'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('SWIFT', 'US', 'John Smith', '012345678');
        payload.aba = '012345678';
        payload.swift_code = '';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And missing swift code', () => {
      const expectedResult = { error: "'swift_code' is required when payment method is 'SWIFT'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('SWIFT', 'US', 'John Smith', '012345678');
        payload.aba = '012345678';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });

  describe('And bank country code - AU', () => {
    describe('And valid length', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;
      const accountArr = [
        { code: 'ICBCAUBJ', length: 8 },
        { code: 'ICBCAUBJ012', length: 11 }];

      accountArr.forEach(account => {
        it(`Should accept swift code '${account.code}' of length ${account.length} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('SWIFT', 'AU', 'John Smith', '012345678');
          payload.bsb = '012345';
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And invalid length', () => {
      const expectedResult = { error: "Length of 'swift_code' should be either 8 or 11" };
      const BAD_REQUEST = 400;

      const accountArr = [
        { code: 'ICBCAUB', length: 7 },
        { code: 'ICBCAUBJ0', length: 9 },
        { code: 'ICBCAUBJ01', length: 10 },
        { code: 'ICBCAUBJ0123', length: 12 }];

      accountArr.forEach(account => {
        it(`Should reject swift code '${account.code}' of length ${account.length} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('SWIFT', 'AU', 'John Smith', '012345678');
          payload.bsb = '012345';
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe(`And missing bank country code 'AU' in the 5th and 6th position in the swift code`, () => {
      const expectedResult = { error: 'The swift code is not valid for the given bank country code: AU' };
      const BAD_REQUEST = 400;

      const accountArr = [
        { code: 'ICBCUSBJ', testCase: 'country code US in the 5th and 6th position' },
        { code: 'ICBCCNBJ', testCase: 'country code CN in the 5th and 6th position' },
        { code: 'ICBCSABJ', testCase: 'non specific country code in in the 5 and 6th position' },
        { code: 'ICBAUCBJ', testCase: 'country code AU in the 4th and 5th position' },
        { code: 'ICBCJAUC', testCase: 'country code AU in the 6th and 7th position' }];

      accountArr.forEach(account => {
        it(`Should reject swift code '${account.code}', because ${account.testCase} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('SWIFT', 'AU', 'John Smith', '012345678');
          payload.bsb = '012345';
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe('And empty swift code', () => {
      const expectedResult = { error: "'swift_code' is required when payment method is 'SWIFT'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('SWIFT', 'AU', 'John Smith', '012345678');
        payload.bsb = '012345';
        payload.swift_code = '';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And missing swift code', () => {
      const expectedResult = { error: "'swift_code' is required when payment method is 'SWIFT'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('SWIFT', 'AU', 'John Smith', '012345678');
        payload.bsb = '012345';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });

  describe('And bank country code - CN', () => {
    describe('And valid length', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;
      const accountArr = [
        { code: 'ICBCCNBJ', length: 8 },
        { code: 'ICBCCNBJ012', length: 11 }];

      accountArr.forEach(account => {
        it(`Should accept swift code '${account.code}' of length ${account.length} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('SWIFT', 'CN', 'John Smith', '012345678');
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And invalid length', () => {
      const expectedResult = { error: "Length of 'swift_code' should be either 8 or 11" };
      const BAD_REQUEST = 400;

      const accountArr = [
        { code: 'ICBCCNB', length: 7 },
        { code: 'ICBCCNBJ0', length: 9 },
        { code: 'ICBCCNBJ01', length: 10 },
        { code: 'ICBCCNBJ0123', length: 12 }];

      accountArr.forEach(account => {
        it(`Should reject swift code '${account.code}' of length ${account.length} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('SWIFT', 'CN', 'John Smith', '012345678');
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe(`And missing bank country code 'CN' in the 5th and 6th position in the swift code`, () => {
      const expectedResult = { error: 'The swift code is not valid for the given bank country code: CN' };
      const BAD_REQUEST = 400;

      const accountArr = [
        { code: 'ICBCUSBJ', testCase: 'country code US in the 5th and 6th position' },
        { code: 'ICBCAUBJ', testCase: 'country code AU in the 5th and 6th position' },
        { code: 'ICBCSABJ', testCase: 'non specific country code in in the 5 and 6th position' },
        { code: 'ICBCNCBJ', testCase: 'country code CN in the 4th and 5th position' },
        { code: 'ICBCJCNC', testCase: 'country code CN in the 6th and 7th position' }];

      accountArr.forEach(account => {
        it(`Should reject swift code '${account.code}', because ${account.testCase} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('SWIFT', 'CN', 'John Smith', '012345678');
          payload.swift_code = account.code;
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe('And empty swift code', () => {
      const expectedResult = { error: "'swift_code' is required when payment method is 'SWIFT'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('SWIFT', 'CN', 'John Smith', '012345678');
        payload.swift_code = '';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And missing swift code', () => {
      const expectedResult = { error: "'swift_code' is required when payment method is 'SWIFT'" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('SWIFT', 'CN', 'John Smith', '012345678');
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });
});
