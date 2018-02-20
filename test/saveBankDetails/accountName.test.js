const { createPayload, testSaveBankDetails } = require('../../helper');

describe('Save Bank Details with account_name field', () => {
  describe('And valid length', () => {
    const expectedResult = { success: 'Bank details saved' };
    const OK = 200;
    const accountArr = [
      { name: 'Jo', length: 2 },
      { name: 'Jon', length: 3 },
      { name: 'John Smit', length: 9 },
      { name: 'John Smith', length: 10 }];

    accountArr.forEach(account => {
      it(`Should accept account name '${account.name}' of length ${account.length} with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
        const payload = createPayload('LOCAL', 'US', account.name, '123');
        return testSaveBankDetails(payload, OK, expectedResult);
      });
    });
  });

  describe('And special characters', () => {
    const expectedResult = { success: 'Bank details saved' };
    const OK = 200;

    const specialCharacterArr = [`!"#$%&'()*`, `+,-./:;<=>`, `?@[\\]^_\`{`, `|}~1`];

    specialCharacterArr.forEach(specialChar => {
      it(`Should accept account name with special characters - '${specialChar}' with RESPONSE - ${expectedResult.success} and STATUS CODE - ${OK}`, () => {
        const payload = createPayload('LOCAL', 'US', specialChar, '123');
        return testSaveBankDetails(payload, OK, expectedResult);
      });
    });
  });

  describe('And invalid length', () => {
    const expectedResult = { error: 'Length of account_name should be between 2 and 10' };
    const BAD_REQUEST = 400;
    const accountArr = [
      { name: 'J', length: 1 },
      { name: 'John Smitty', length: 11 }];

    accountArr.forEach(account => {
      it(`Should reject account name '${account.name}' of length ${account.length} with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
        const payload = createPayload('LOCAL', 'US', account.name, '123');
        return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
      });
    });
  });

  describe('And empty account name', () => {
    const expectedResult = { error: "'account_name' is required" };
    const BAD_REQUEST = 400;

    it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
      const payload = createPayload('LOCAL', 'US', '', '123');
      return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
    });
  });

  describe('And missing account name', () => {
    const expectedResult = { error: "'account_name' is required" };
    const BAD_REQUEST = 400;

    it(`Should reject with ERROR - ${expectedResult.error} and STATUS CODE - ${BAD_REQUEST}`, () => {
      const payload = createPayload('LOCAL', 'US', '', '123');
      delete payload.account_name;
      return testSaveBankDetails(payload, BAD_REQUEST, expectedResult);
    });
  });
});
