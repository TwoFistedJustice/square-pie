"use strict";
const should = require("chai").should();
const Customer_List = require("../src/lib/customer_request_list");
const Customer_Search = require("../src/lib/customer_request_search");
const Customer_Create = require("../src/lib/customer_request_create");
const Customer_Retrieve = require("../src/lib/customer_request_retrieve");
const Customer_Update = require("../src/lib/customer_request_update");
const Customer_Delete = require("../src/lib/customer_request_delete");
const Customer_Retrieve_Update_Delete = require("../src/lib/customer_request_R_U_D");
const Customer_Object = require("../src/lib/customer_object");
const { sampleCustomers } = require("./helper_objects");
// const {expect} = require ("chai");
const customers = sampleCustomers;
const buffy = customers.buffy;
const mikey = customers.mikey;

// ---------------------------------------------------
// Hardcoded http requests for the hooks
// Do not use the request classes to test themselves!
// ---------------------------------------------------
// setting new timeout bc terrible rural internet keeps causing then test to time out and fail.
// despite whatever Jest docs say, this timer thing does not work AT. ALL.
beforeAll(() => jest.setTimeout(10 * 1000));

describe("Silence Async tests", () => {
  test("Should silence async customer tests", () => {
    expect("a").toEqual("a");
  });
});

describe("Customer Request Classes", () => {
  let dbBuffy, mikeId;
  jest.useFakeTimers();

  describe("Customer List", () => {
    test("Should fetch the list of customers", async () => {
      let customerList = new Customer_List();
      await customerList.request();
      customerList.delivery.should.be.an("Array").that.has.lengthOf(4);
      // console.log(customerList.delivery)
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
      await customers.request();
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
      await findBuffy.request();
      let email = findBuffy.delivery[0].email_address;
      email.should.equal(param);
    });
  });

  // tests below here depend on the success of the LIST test
  describe("Customer Retrieve", () => {
    test("Should Retrieve a customer by id", async () => {
      let rescueBuffy = new Customer_Retrieve(dbBuffy.id);
      await rescueBuffy.request();
      expect(rescueBuffy.delivery).toMatchObject(dbBuffy);
    });
  });

  describe("Customer Update", () => {
    // change Buffy's email
    test("Should update a customer using normal setter", async () => {
      let email = "buffy@scooby.org";
      let update = new Customer_Update(dbBuffy.id);
      update.email_address = email;
      await update.request();
      let updatedEmail = update.delivery.email_address;
      updatedEmail.should.equal(email);
    });
  });

  describe("Customer Create", () => {
    test("Should create a new customer", async () => {
      // add mikey
      let punchingBagForBuffy = new Customer_Create(mikey);
      await punchingBagForBuffy.request();
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
      await buffyVsMichaelMyers.request();
      expect(buffyVsMichaelMyers.delivery).toMatchObject({});
    });
  });
});

describe("Display Names", () => {
  test("Customer_Search should have displayName property", () => {
    let val = new Customer_Search();
    expect(val.displayName).toEqual("Customer_Search");
  });

  test("Customer_Retrieve should have displayName property", () => {
    let val = new Customer_Retrieve();
    expect(val.displayName).toEqual("Customer_Retrieve");
  });

  test("Customer_Retrieve_Update_Delete should have displayName property", () => {
    let val = new Customer_Retrieve_Update_Delete();
    expect(val.displayName).toEqual("Customer_Retrieve_Update_Delete");
  });

  test("should have displayName property", () => {
    let customer = new Customer_Object();
    customer
      .make()
      .first_name("Buffy")
      .last_name("Summers")
      .email("buffy@magicbox.com");

    let val = new Customer_Create(customer.fardel);
    expect(val.displayName).toEqual("Customer_Create");
  });

  test("should have displayName property", () => {
    let val = new Customer_Delete();
    expect(val.displayName).toEqual("Customer_Delete");
  });

  test("should have displayName property", () => {
    let val = new Customer_List();
    expect(val.displayName).toEqual("Customer_List");
  });
});
