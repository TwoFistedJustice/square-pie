// const expect = require("chai");
require("@babel/register")({
  presets: ["es2021"],
});

const fetch = require("node-fetch");
const { v4: uuid4 } = require("uuid");
uuid4();
const { expect } = require("chai");
const { sampleCustomers } = require("./sampleData");
const config = require("../src/config");
const secret = process.env.SANDBOX;

describe("hooks", async function () {
  // pre hook
  //runs once before any tests are begun
  before("description", async function () {
    let customers = sampleCustomers();
    let customerList = [].push(customers.trickrTreat, customers.daSlayer);

    const request = async function (_body) {
      _body.idempotency_key = uuid4();

      let _headers = {
        "Square-Version": `${config.squareVersion}`,
        "Content-Type": `${config.contentType}`,
        Accept: `${config.Accept}`,
        Authorization: `Bearer ${secret}`,
      };

      let url = `https://connect.squareupsandbox.com/v2/customers`;

      let options = {
        method: "post",
        headers: _headers(secret),
        body: JSON.stringify(_body),
      };

      let httpResponse = await fetch(url, options);
      if (!httpResponse.ok) {
        let message = `\nbefore hook: ${url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}`;
        throw new Error(message);
      }
      let response = await httpResponse.json();
      return response;
    };

    customerList.forEach(async (customer) => {
      let create = await request(customer);
      console.log(create);
      return true;
    });
  });

  //runs before each test
  // beforeEach("description", async function () {}); //post hook

  // make sure length is zero, or throw a fit, err, error

  // runs after each test
  afterEach("description", function () {
    console.log("after");
  });
  //
  // // runs once after all tests complete
  // after("description", async function () {
  //   // delete all of them
  //   // get a count
  //   // delete that many
  //   //  hard code the delete - don't use our classes
  // });
  //
  // describe("email should be normalized", () => {
  //   // create a new custReq
  //   // a normal email should be unchanged
  //   // a gmail with lots of dots should have not dots
  //   // a yahoo disposable address should be unchanged
  //   // we don't need to test every possibility because this is from a package.
  //   // we really just need to know that it is returning somethign usable.
  //   // and that our config settings are working as expected
  // });
  //
  // describe("Fetch a list of customers", () => {
  //   // we can probably extract out the database populate/clear and reuse it
  //   // clear the sandbox db
  //   // create several customers
  //   // fetch the list and confirm it is fetched
  //   // check the length
  //   // check that it contains all the things
  //   // verify against a field, given_name for example
  // });
  //
  // describe("Should create a customer", () => {
  //   // create a customer
  //   // retrieve the customer make sure it's the same one
  // });
  //
  // describe("Should find customers with fuzzy data", () => {
  //   // test each sub-method of CustomerSearch.query
  //   // test fuzzy
  //   // then test one call with all of them chained
  //   // test the data fields with one long chain - this is in addition to individual tests
  //   // verifies that the chaining works
  // });
  //
  // describe("Should find customers with exact data", () => {
  //   // test each sub-method of CustomerSearch.query
  //   //  exact
  //   // then test one call with all of them chained
  //   // no need to test the chaining if it worked in the fuzzy test
  // });
  //
  // describe("Should update a customer", () => {
  //   //  fetch one, change the all the fields using the SETTERS, fetch it again, make sure it's the matches.
  //   // do the same thing but this time use the chainSet method
  // });
  //
  // describe("Should retrieve a customer", () => {
  //   // make a customer,
  //   // test that it finds that customer
  // });

  describe("Should delete a customer", () => {
    it("should be true", () => {
      expect(true).to.eql(true);
    });

    // make a customer
    // verify that the customer is made
    // delete the customer
    // should return an empty object
  });
});
