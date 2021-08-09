"use strict";
const should = require("chai").should();
const secret = process.env.SANDBOX;
// const { buffy, jason } = require("./sampleData");
const { sampleCustomers } = require("./sampleData");
const customers = sampleCustomers();
const buffy = customers.buffy;
// const jason = customers.jason;
// const fred = customers.fred;
// const freddie = customers.freddie;
// const mikey = customers.mikey;

const {
  CustomerList,
  // CustomerSearch,
  // CustomerUpdate,
  CustomerRetrieve,
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

describe("Customer List", () => {
  let dbBuffy;
  jest.useFakeTimers();
  test("Should fetch the list of customers", async () => {
    let customerList = new CustomerList(false);
    let response = await customerList.makeRequest(secret);
    let customers = response.customers;
    customers.should.be.an("Array").that.has.lengthOf(4);
    expect(customers[0]).toMatchObject(buffy);
    dbBuffy = customers[0];
  });
  // tests below here depend on the success of the LIST test
  describe("Customer Retrieve", () => {
    test("Should Retrieve a customer by id", async () => {
      let rescueBuffy = new CustomerRetrieve(false);
      rescueBuffy.id = dbBuffy.id;
      let response = await rescueBuffy.makeRequest(secret);
      expect(response.customer).toMatchObject(dbBuffy);
    });
  });
});

describe("Customer Search", () => {
  test("Should execute an individual fuzzy Search", async () => {
    // find by phone '555'
    // sort descending
  });
  test("Should execute a chain fuzzy Search", async () => {
    // find by name 'fred'
    // sort by most recent
  });
  test("Should exact find a customer", async () => {
    // find bufffy summers
  });
  test("", async () => {});
});
describe("Customer Create", () => {
  test("Should create a new customer", async () => {
    // add mikey
  });
});
describe("Customer Update", () => {
  test("Should update a customer", async () => {
    // change Buffy's email
  });
});
describe("Customer Delete", () => {
  test("", async () => {
    // nobody like Michael Myers, delete him
    //
  });
});
describe("", () => {});

test("Should individual fuzzy Search a customer", async () => {});
test("Should chain fuzzy Search a customer", async () => {});
test("", async () => {});

test("Should exact find a customer", async () => {});

test("", async () => {});
test("", async () => {});
