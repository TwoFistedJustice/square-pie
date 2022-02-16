"use strict";
const should = require("chai").should();
const Customer_List = require("../../src/lib/customer_request_list");
const Customer_Search = require("../../src/lib/customer_request_search");
const Customer_Create = require("../../src/lib/customer_request_create");
const Customer_Retrieve = require("../../src/lib/customer_request_retrieve");
const Customer_Update = require("../../src/lib/customer_request_update");
const Customer_Delete = require("../../src/lib/customer_request_delete");
const Customer_Retrieve_Update_Delete_Super = require("../../src/lib/customer_request_abstract_R_U_D_super");
const Customer_Object = require("../../src/lib/customer_object");
const { sampleCustomers } = require("../helper_objects");
// const {expect} = require ("chai");
const customers = sampleCustomers;
const buffy = customers.buffy;
const mikey = customers.mikey;

// ---------------------------------------------------
// Hardcoded http requests for the hooks
// Do not use the request classes to test themselves!
// ---------------------------------------------------
// setting a timer bc terrible rural internet keeps causing the tests to time out and fail.

/** @function wait - delays synchronous execution. Very heavy CPU use. Do not use in production code.
 * @param {number} sec - the number of seconds to wait before continuing synchronous execution
 * @author ThinkBonobo https://stackoverflow.com/users/2668545/thinkbonobo
 * {@link https://stackoverflow.com/questions/6921895/synchronous-delay-in-code-execution | Stackoverflow}
 * */

describe.only("silence async", () => {
  test("un-comment the iife function before enabling other tests", () => {
    expect(true).toEqual(true);
  });
});

// (function wait(sec) {
//   const ms = sec * 1000;
//   let start = Date.now(); // set baseline ms
//   let now = start; // set now to equal baseline
//   while (now - start < ms) {
//     // measure difference between baseline and 'now'
//     now = Date.now(); // reset 'now' to later time and repeat
//   }
// })(30);

describe("Customer Request Classes", () => {
  let dbBuffy, mikeId;
  jest.useFakeTimers();

  describe("Customer List", () => {
    test("Should fetch the list of customers", async () => {
      let customerList = new Customer_List();
      console.log(customerList._secret);
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
    // disabled this test because Square does not seem to sort them into ANY order. They seem to randomly
    // placed into the array.
    // test("Should execute a fuzzy Search and sort the results in descending order.", async () => {
    //   let customers = new Customer_Search();
    //   customers.query().fuzzy().phone("555").sortDown();
    //   await customers.request();
    //   customers.delivery.should.be.an("Array").that.has.lengthOf(4);
    //
    //   for(let i = 0; i < customers.delivery.length-1; i++ ){
    //     console.log (Date.parse(customers.delivery[i]["created_at"]))
    //   }
    //
    //   for (let i = 0; i < customers.delivery.length - 2; i++) {
    //
    //     Date.parse(customers.delivery[i]["created_at"]).should.be.greaterThan(
    //       Date.parse(customers.delivery[i + 1]["created_at"])
    //     );
    //   }
    // });

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
      // console.log("***********************************");
      // console.log(punchingBagForBuffy.delivery);
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
  test("Customer_Search should have display_name property", () => {
    let val = new Customer_Search();
    expect(val.display_name).toEqual("Customer_Search");
  });

  test("Customer_Retrieve should have display_name property", () => {
    let val = new Customer_Retrieve();
    expect(val.display_name).toEqual("Customer_Retrieve");
  });

  test("Customer_Retrieve_Update_Delete should have display_name property", () => {
    let val = new Customer_Retrieve_Update_Delete_Super();
    expect(val.display_name).toEqual("Customer_Retrieve_Update_Delete_Super");
  });

  test("should have display_name property", () => {
    let customer = new Customer_Object();
    customer
      .make()
      .first_name("Buffy")
      .last_name("Summers")
      .email("buffy@magicbox.com");

    let val = new Customer_Create(customer.fardel);
    expect(val.display_name).toEqual("Customer_Create");
  });

  test("should have display_name property", () => {
    let val = new Customer_Delete();
    expect(val.display_name).toEqual("Customer_Delete");
  });

  test("should have display_name property", () => {
    let val = new Customer_List();
    expect(val.display_name).toEqual("Customer_List");
  });
});
