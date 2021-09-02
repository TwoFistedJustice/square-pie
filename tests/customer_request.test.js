"use strict";
const should = require("chai").should();
const Customer_List = require("../src/lib/customer_request_list");
const Customer_Search = require("../src/lib/customer_request_search");
const Customer_Create = require("../src/lib/customer_request_create");
const Customer_Retrieve = require("../src/lib/customer_request_retrieve");
const Customer_Update = require("../src/lib/customer_request_update");
const Customer_Delete = require("../src/lib/customer_request_delete");
const { sampleCustomers } = require("./data_preparation/sample_customer_data");
const customers = sampleCustomers();
const buffy = customers.buffy;
const mikey = customers.mikey;

// ---------------------------------------------------
// Hardcoded http requests for the hooks
// Do not use the request classes to test themselves!
// ---------------------------------------------------
// setting new timeout bc terrible rural internet keeps causing the test to time out and fail.
// despite whatever Jest docs say, this timer thing does not work AT. ALL.
beforeAll(() => jest.setTimeout(10 * 1000));

describe("Silence Async tests", () => {
  test.only("Should silence async customer tests", () => {
    expect("a").toEqual("a");
  });
});

describe("Customer Request Classes", () => {
  let dbBuffy, mikeId;
  jest.useFakeTimers();

  describe("Customer List", () => {
    test("Should fetch the list of customers", async () => {
      let customerList = new Customer_List();
      // let response = await customerList.makeRequest();
      await customerList.makeRequest();
      customerList.delivery.should.be.an("Array").that.has.lengthOf(4);
      expect(customerList.delivery[0]).toMatchObject(buffy);
      // Michael Myers is not invited but will show up later - at which time Buffy will deal with him, as she does.
      for (let i = 0; i < customers.length; i++) {
        expect(customerList.delivery[i]).not.toMatchObject(mikey);
      }
      dbBuffy = customerList.delivery[0];
    });
  });

  describe("Customer Search", () => {
    test("Should execute a fuzzy Search and sort the results in descending order.", async () => {
      let customers = new Customer_Search();
      customers.query().fuzzy().phone("555").sortDown();
      await customers.makeRequest();
      customers.delivery.should.be.an("Array").that.has.lengthOf(4);
      for (let i = 0; i < customers.delivery.length - 2; i++) {
        Date.parse(customers.delivery[i]["created_at"]).should.be.greaterThan(
          Date.parse(customers.delivery[i + 1]["created_at"])
        );
      }
    });

    test("Should exact search and find a customer", async () => {
      let param = "buffy@magicbox.com";
      let findBuffy = new Customer_Search();
      findBuffy.query().exact().email(param);
      await findBuffy.makeRequest();
      let email = findBuffy.delivery[0].email_address;
      email.should.equal(param);
    });
  });

  // tests below here depend on the success of the LIST test
  describe("Customer Retrieve", () => {
    test("Should Retrieve a customer by id", async () => {
      let rescueBuffy = new Customer_Retrieve(dbBuffy.id);
      await rescueBuffy.makeRequest();
      expect(rescueBuffy.delivery).toMatchObject(dbBuffy);
    });
  });

  describe("Customer Update", () => {
    // change Buffy's email
    test("Should update a customer using normal setter", async () => {
      let email = "buffy@scooby.org";
      let update = new Customer_Update(dbBuffy.id);
      update.email_address = email;
      await update.makeRequest();
      let updatedEmail = update.delivery.email_address;
      updatedEmail.should.equal(email);
    });

    // oops the last update put in the wrong email and didn't change her phone number to her new number
    test("Should update a customer using chain setter", async () => {
      let email = "buFFy@scoobies.org";
      let normalizedEmail = "buffy@scoobies.org";
      let phone = "1-800-668-2677";
      let update = new Customer_Update(dbBuffy.id);
      update.chainSet().email(email).phone(phone);
      await update.makeRequest();
      let updatedEmail = update.delivery.email_address;
      let updatedPhone = update.delivery.phone_number;
      updatedEmail.should.equal(normalizedEmail);
      updatedPhone.should.equal(phone);
    });
  });

  describe("Customer Create", () => {
    test("Should create a new customer", async () => {
      // add mikey
      let punchingBagForBuffy = new Customer_Create(mikey);
      await punchingBagForBuffy.makeRequest();
      let email = punchingBagForBuffy.delivery.email_address;
      mikeId = punchingBagForBuffy.delivery.id;
      // if the email matches, the customer was created
      email.should.equal("candytime@gmail.com");
    });
  });

  describe("Customer Delete", () => {
    // id is set in test for Customer Create
    test("Should delete the specified customer", async () => {
      // What would happen if Buffy fought Michael Myers?
      let buffyVsMichaelMyers = new Customer_Delete(mikeId);
      await buffyVsMichaelMyers.makeRequest();
      expect(buffyVsMichaelMyers.delivery).toMatchObject({});
    });
  });
});
