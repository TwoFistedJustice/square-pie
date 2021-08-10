"use strict";
const should = require("chai").should();
const { sampleCustomers } = require("./sampleData");
const customers = sampleCustomers();
const buffy = customers.buffy;
// const jason = customers.jason;
// const fred = customers.fred;
// const freddie = customers.freddie;
const mikey = customers.mikey;

const {
  CustomerList,
  CustomerSearch,
  CustomerCreate,
  CustomerRetrieve,
  CustomerUpdate,
  CustomerDelete,
} = require("../src/CustomerRequests");

// ---------------------------------------------------
// Hardcoded http requests for the hooks
// Do not use the request classes to test themselves!
// ---------------------------------------------------
// setting new timeout bc terrible rural internet keeps causing the test to time out and fail.
// despite whatever Jest docs say, this timer thing does not work AT. ALL.
beforeAll(() => jest.setTimeout(10 * 1000));

describe("Customer Request Classes", () => {
  let dbBuffy, mikeId;
  jest.useFakeTimers();

  describe("Customer List", () => {
    test("Should fetch the list of customers", async () => {
      let customerList = new CustomerList();
      let response = await customerList.makeRequest();
      let customers = response.customers;
      customers.should.be.an("Array").that.has.lengthOf(4);
      expect(customers[0]).toMatchObject(buffy);
      dbBuffy = customers[0];
    });
  });

  describe("Customer Search", () => {
    test("Should execute a fuzzy Search and sort the results in descending order.", async () => {
      let find555 = new CustomerSearch();
      find555.query().fuzzy().phone("555").sortDown();
      let response = await find555.makeRequest();
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
      let findBuffy = new CustomerSearch();
      findBuffy.query().exact().email(param);
      let response = await findBuffy.makeRequest();
      let email = response.customers[0].email_address;
      email.should.equal(param);
    });
  });

  // tests below here depend on the success of the LIST test
  describe("Customer Retrieve", () => {
    test("Should Retrieve a customer by id", async () => {
      let rescueBuffy = new CustomerRetrieve(dbBuffy.id);
      let response = await rescueBuffy.makeRequest();
      expect(response.customer).toMatchObject(dbBuffy);
    });
  });

  describe("Customer Update", () => {
    // change Buffy's email
    test("Should update a customer using normal setter", async () => {
      let email = "buffy@scooby.org";
      let update = new CustomerUpdate(dbBuffy.id);
      update.email_address = email;
      let response = await update.makeRequest();
      let updatedEmail = response.customer.email_address;
      updatedEmail.should.equal(email);
    });

    // oops the last update put in the wrong email and didn't change her phone number to her new number
    test("Should update a customer using chain setter", async () => {
      let email = "buffy@scoobies.org";
      let phone = "1-800-668-2677";
      let update = new CustomerUpdate(dbBuffy.id);
      update.chainSet().email(email).phone(phone);
      let response = await update.makeRequest();
      let updatedEmail = response.customer.email_address;
      let updatedPhone = response.customer.phone_number;
      updatedEmail.should.equal(email);
      updatedPhone.should.equal(phone);
    });
  });

  describe("Customer Create", () => {
    test("Should create a new customer", async () => {
      // add mikey
      let punchingBagForBuffy = new CustomerCreate();
      punchingBagForBuffy.customer = mikey;
      let response = await punchingBagForBuffy.makeRequest();
      let email = response.customer.email_address;
      mikeId = response.customer.id;
      // if the email matches, the customer was created
      email.should.equal("candytime@gmail.com");
    });
  });

  describe("Customer Delete", () => {
    // id is set in test for Customer Create
    test("", async () => {
      // What would happen if Buffy fought Michael Myers?
      let buffyVsMichaelMyers = new CustomerDelete(mikeId);
      let buhbye = await buffyVsMichaelMyers.makeRequest();
      expect(buhbye).toMatchObject({});
    });
  });
});
