"use strict";
const should = require("chai").should();
const secret = process.env.SANDBOX;
const { buffy, jason } = require("./sampleData");

const {
  CustomerList,
  // CustomerSearch,
  // CustomerUpdate,
  // CustomerRetrieve,
  // CustomerDelete,
  // CustomerCreate,
} = require("../src/CustomerRequests");

// ---------------------------------------------------
// Hardcoded http requests for the hooks
// Do not use the request classes to test themselves!
// ---------------------------------------------------
// setting new timeout bc terrible rural internet keeps causing the test to time out and fail.
// despite whatever Jest docs say, this timer thing does not work AT. ALL.
beforeAll(() => jest.setTimeout(10 * 1000));

describe("Customer Request classes", () => {
  jest.useFakeTimers();
  test("Should return the list of customers", async () => {
    let customerList = new CustomerList(false);
    let response = await customerList.makeRequest(secret);
    let customers = response.customers;
    customers.should.be.an("Array").that.has.lengthOf(2);
    expect(customers[0]).toMatchObject(buffy);
    expect(customers[1]).toMatchObject(jason);
  });
});
