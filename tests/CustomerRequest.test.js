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
  CustomerSearch,
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
  test("Should execute a fuzzy Search and sort the results in descending order.", async () => {
    let find555 = new CustomerSearch(false);
    find555.query().fuzzy().phone("555").sortDown();
    let response = await find555.makeRequest(secret);
    let customers = response.customers;
    customers.should.be.an("Array").that.has.lengthOf(4);
    Date.parse(customers[0]["created_at"]).should.be.greaterThan(
      Date.parse(customers[1]["created_at"])
    );

    Date.parse(customers[1]["created_at"]).should.be.greaterThan(
      Date.parse(customers[2]["created_at"])
    );

    Date.parse(customers[2]["created_at"]).should.be.greaterThan(
      Date.parse(customers[3]["created_at"])
    );
  });

  test("Should exact search and find a customer", async () => {
    let param = "buffy@magicbox.com";
    let findBuffy = new CustomerSearch(false);
    findBuffy.query().exact().email(param);
    let response = await findBuffy.makeRequest(secret);
    let email = response.customers[0].email_address;
    email.should.equal(param);
  });
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
