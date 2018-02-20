const { createPayload, testSaveBankDetails } = require('../../helper');

describe('Save Bank Details with account_number field', () => {
  describe('And bank country code - US', () => {
    describe('And valid length', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;
      const accountArr = [
        { number: '1', length: 1 },
        { number: '12', length: 2 },
        { number: '0123456789012345', length: 16 },
        { number: '01234567890123456', length: 17 }];

      accountArr.forEach(account => {
        it(`Should accept account number '${account.number}' of length ${account.length} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('LOCAL', 'US', 'John Smith', account.number);
          payload.aba = '012345678';
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And special characters', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      const specialCharacterArr = [`!"#$%&'()*+,-./:;`, `'<=>?@[\\]^_\`{|}~1`];

      specialCharacterArr.forEach(specialChar => {
        it(`Should accept account number with special characters - '${specialChar}' with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('LOCAL', 'US', 'John Smith', specialChar);
          payload.aba = '012345678';
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And invalid length', () => {
      const expectedResult = { error: "Length of account_number should be between 1 and 17 when bank_country_code is 'US'" };
      const BAD_REQUEST = 400;

      it(`Should reject account number '012345678901234567' of length 18 with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'US', 'John Smith', '012345678901234567');
        payload.aba = '012345678';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And empty account number', () => {
      const expectedResult = { error: "'account_number' is required" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'US', 'John Smith', '');
        payload.aba = '012345678';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And missing account name', () => {
      const expectedResult = { error: "'account_number' is required" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'US', 'John Smith', '');
        payload.aba = '012345678';
        delete payload.account_number;
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });

  describe('And bank country code - AU', () => {
    describe('And valid length', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;
      const accountArr = [
        { number: '012345', length: 6 },
        { number: '0123456', length: 7 },
        { number: '01234567', length: 8 },
        { number: '012345678', length: 9 }];

      accountArr.forEach(account => {
        it(`Should accept account number '${account.number}' of length ${account.length} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('LOCAL', 'AU', 'John Smith', account.number);
          payload.bsb = '012345';
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And special characters', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      const specialCharacterArr = [`!"#$%&'()`, `*+,-./:;'`, `<=>?@[\\]^`, `_\`{|}~1`];

      specialCharacterArr.forEach(specialChar => {
        it(`Should accept account number with special characters - '${specialChar}' with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('LOCAL', 'AU', 'John Smith', specialChar);
          payload.bsb = '012345';
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And invalid length', () => {
      const expectedResult = { error: "Length of account_number should be between 6 and 9 when bank_country_code is 'AU'" };
      const BAD_REQUEST = 400;

      const accountArr = [
        { number: '01234', length: 5 },
        { number: '0123456789', length: 10 }
      ];

      accountArr.forEach(account => {
        it(`Should reject account number '${account.number}' of length ${account.length} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('LOCAL', 'AU', 'John Smith', account.number);
          payload.bsb = '012345';
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe('And empty account number', () => {
      const expectedResult = { error: "'account_number' is required" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'AU', 'John Smith', '');
        payload.bsb = '012345';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And missing account name', () => {
      const expectedResult = { error: "'account_number' is required" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'AU', 'John Smith', '');
        payload.bsb = '012345';
        delete payload.account_number;
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });

  describe('And bank country code - CN', () => {
    describe('And valid length', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;
      const accountArr = [
        { number: '01234567', length: 8 },
        { number: '012345678', length: 9 },
        { number: '0123456789012345678', length: 19 },
        { number: '01234567890123456789', length: 20 }];

      accountArr.forEach(account => {
        it(`Should accept account number '${account.number}' of length ${account.length} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('LOCAL', 'CN', 'John Smith', account.number);
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And special characters', () => {
      const expectedResult = { success: 'Bank details saved' };
      const OK = 200;

      const specialCharacterArr = [`!"#$%&'()`, `*+,-./:;'`, `<=>?@[\\]^`, `_\`{|}~1`];

      specialCharacterArr.forEach(specialChar => {
        it(`Should accept account number with special characters - '${specialChar}' with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
          const payload = createPayload('LOCAL', 'CN', 'John Smith', specialChar);
          return testSaveBankDetails(payload, OK, expectedResult);
        });
      });
    });

    describe('And invalid length', () => {
      const expectedResult = { error: "Length of account_number should be between 8 and 20 when bank_country_code is 'CN'" };
      const BAD_REQUEST = 400;

      const accountArr = [
        { number: '0123456', length: 7 },
        { number: '012345678901234567890', length: 21 }
      ];

      accountArr.forEach(account => {
        it(`Should reject account number '${account.number}' of length ${account.length} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
          const payload = createPayload('LOCAL', 'CN', 'John Smith', account.number);
          return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
        });
      });
    });

    describe('And empty account number', () => {
      const expectedResult = { error: "'account_number' is required" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'CN', 'John Smith', '');
        payload.bsb = '012345';
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });

    describe('And missing account name', () => {
      const expectedResult = { error: "'account_number' is required" };
      const BAD_REQUEST = 400;

      it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'CN', 'John Smith', '');
        payload.bsb = '012345';
        delete payload.account_number;
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });
});
