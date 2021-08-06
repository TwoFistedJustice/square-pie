// const expect = require("chai");

// test super normalizeEmail
//

// pre hook

//post hook
// clear out customer db
// make sure length is zero, or throw a fit, err, error

describe("email should be normalized", () => {
  // create a new custReq
  // a normal email should be unchanged
  // a gmail with lots of dots should have not dots
  // a yahoo disposable address should be unchanged
  // we don't need to test every possibility because this is from a package.
  // we really just need to know that it is returning somethign usable.
  // and that our config settings are working as expected
});

describe("Fetch a list of customers", () => {
  // we can probably extract out the database populate/clear and reuse it
  // clear the sandbox db
  // create several customers
  // fetch the list and confirm it is fetched
  // check the length
  // check that it contains all the things
  // verify against a field, given_name for example
});

describe("Should create a customer", () => {
  // create a customer
  // retrieve the customer make sure it's the same one
});

describe("Should find customers with fuzzy data", () => {
  // test each sub-method of CustomerSearch.query
  // test fuzzy
  // then test one call with all of them chained
  // test the data fields with one long chain - this is in addition to individual tests
  // verifies that the chaining works
});

describe("Should find customers with exact data", () => {
  // test each sub-method of CustomerSearch.query
  //  exact
  // then test one call with all of them chained
  // no need to test the chaining if it worked in the fuzzy test
});

describe("Should update a customer", () => {
  //  fetch one, change the all the fields using the SETTERS, fetch it again, make sure it's the matches.
  // do the same thing but this time use the chainSet method
});

describe("Should retrieve a customer", () => {
  // make a customer,
  // test that it finds that customer
});

describe("Should delete a customer", () => {
  // make a customer
  // verify that the customer is made
  // delete the customer
  // should return an empty object
});
