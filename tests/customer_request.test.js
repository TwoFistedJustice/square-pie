"use strict";
const should = require("chai").should();
const { sampleCustomers } = require("./sample_data");
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
} = require("../src/customer_requests");

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
      // let response = await customerList.makeRequest();
      await customerList.makeRequest();
      customerList.fardel.should.be.an("Array").that.has.lengthOf(4);
      expect(customerList.fardel[0]).toMatchObject(buffy);
      // Michael Myers is not invited but will show up later - at which time Buffy will deal with him, as she does.
      for (let i = 0; i < customers.length; i++) {
        expect(customerList.fardel[i]).not.toMatchObject(mikey);
      }
      dbBuffy = customerList.fardel[0];
    });
  });

  describe("Customer Search", () => {
    test("Should execute a fuzzy Search and sort the results in descending order.", async () => {
      let customers = new CustomerSearch();
      customers.query().fuzzy().phone("555").sortDown();
      await customers.makeRequest();
      customers.fardel.should.be.an("Array").that.has.lengthOf(4);
      for (let i = 0; i < customers.fardel.length - 2; i++) {
        Date.parse(customers.fardel[i]["created_at"]).should.be.greaterThan(
          Date.parse(customers.fardel[i + 1]["created_at"])
        );
      }
    });

    test("Should exact search and find a customer", async () => {
      let param = "buffy@magicbox.com";
      let findBuffy = new CustomerSearch();
      findBuffy.query().exact().email(param);
      await findBuffy.makeRequest();
      let email = findBuffy.fardel[0].email_address;
      email.should.equal(param);
    });
  });

  // tests below here depend on the success of the LIST test
  describe("Customer Retrieve", () => {
    test("Should Retrieve a customer by id", async () => {
      let rescueBuffy = new CustomerRetrieve(dbBuffy.id);
      await rescueBuffy.makeRequest();
      expect(rescueBuffy.fardel).toMatchObject(dbBuffy);
    });
  });

  describe("Customer Update", () => {
    // change Buffy's email
    test("Should update a customer using normal setter", async () => {
      let email = "buffy@scooby.org";
      let update = new CustomerUpdate(dbBuffy.id);
      update.email_address = email;
      await update.makeRequest();
      let updatedEmail = update.fardel.email_address;
      updatedEmail.should.equal(email);
    });

    // oops the last update put in the wrong email and didn't change her phone number to her new number
    test("Should update a customer using chain setter", async () => {
      let email = "buFFy@scoobies.org";
      let normalizedEmail = "buffy@scoobies.org";
      let phone = "1-800-668-2677";
      let update = new CustomerUpdate(dbBuffy.id);
      update.chainSet().email(email).phone(phone);
      await update.makeRequest();
      let updatedEmail = update.fardel.email_address;
      let updatedPhone = update.fardel.phone_number;
      updatedEmail.should.equal(normalizedEmail);
      updatedPhone.should.equal(phone);
    });
  });

  describe("Customer Create", () => {
    test("Should create a new customer", async () => {
      // add mikey
      let punchingBagForBuffy = new CustomerCreate(mikey);
      await punchingBagForBuffy.makeRequest();
      let email = punchingBagForBuffy.fardel.email_address;
      mikeId = punchingBagForBuffy.fardel.id;
      // if the email matches, the customer was created
      email.should.equal("candytime@gmail.com");
    });
  });

  describe("Customer Delete", () => {
    // id is set in test for Customer Create
    test("Should delete the specified customer", async () => {
      // What would happen if Buffy fought Michael Myers?
      let buffyVsMichaelMyers = new CustomerDelete(mikeId);
      await buffyVsMichaelMyers.makeRequest();
      expect(buffyVsMichaelMyers.fardel).toMatchObject({});
    });
  });
});
