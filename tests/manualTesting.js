require("dotenv/config");
const { sampleCustomers } = require("./sampleData");
const secret = process.env.SANDBOX;
const config = require("../src/config");
const testCustomers = sampleCustomers();

const {
  CustomerList,
  CustomerSearch,
  CustomerUpdate,
  CustomerRetrieve,
  CustomerDelete,
  CustomerCreate,
} = require("../src/CustomerRequests");

// These are all repurposed from the original code designed to work on Wix Velo
// this is a make-do till we get unit testing up and running.

const fetchIndexZeroCustomerId = async function () {
  let testCustomerSqID;
  let list = await testList();

  if (!list.customers) {
    let newCustomer = await testCreate();
    testCustomerSqID = newCustomer.customer.id;
  } else {
    testCustomerSqID = list.customers[0].id;
  }
  if (!testCustomerSqID) {
    throw new Error(
      "Something went wrong with setting the ID in testDelete();"
    );
  }
  return list.customers[0].id;
};

async function testList() {
  var list = new CustomerList(false);
  let customerList = await list.makeRequest(secret);
  console.log(`Toal objects: ${customerList.customers.length}`);
  console.log(customerList.customers);
  return customerList;
}

async function testCreate() {
  let someGuy = new CustomerCreate(false);
  // someGuy.customer = testCustomers.shorthand;
  // someGuy.customer = testCustomers.trickrTreat;
  // someGuy.customer = testCustomers.spiritual;
  // someGuy.customer = testCustomers.unhappy;
  // someGuy.customer = testCustomers.stoneage;
  someGuy.customer = testCustomers.daSlayer;
  let response = await someGuy.makeRequest(secret);
  return response;
}

async function testSearchLimit() {
  let search = new CustomerSearch(config.sandbox);
  search.query().fuzzy().email("fred").limit(1);
  let response = await search.makeRequest(secret);
  console.log("expect ONE fred to come back- Either one okay");
  return response;
}

async function testSearchPhone() {
  let search = new CustomerSearch(config.sandbox);
  search.query().fuzzy().email("fred").phone("77");
  let response = await search.makeRequest(secret);
  console.log("expect ONE fred to come back - FLINTSTONE");
  return response;
}

async function testSortSearchDown() {
  let search = new CustomerSearch(config.sandbox);
  search.query().fuzzy().sortDown().sortByName();
  return await search.makeRequest(secret);
}

async function testSortSearchUp() {
  let search = new CustomerSearch(config.sandbox);
  search.query().fuzzy().sortUp().sortByName();
  return await search.makeRequest(secret);
}

async function testUpdate() {
  // first you need the customer ID
  let id = await fetchIndexZeroCustomerId();
  // then you need to get the current data as stored on Square
  // you need the current version number in order to update
  // the version number is a property on the returned customer
  let retrieve = new CustomerRetrieve(false);
  retrieve.id = id;
  let retrieveResponse = await retrieve.makeRequest(secret);
  let customer = retrieveResponse.customer;

  // just auto switching some variables to faciliate testing
  let firstName = customer.given_name === "Jack" ? "Buffy" : "Jack";
  let lastName = customer.family_name === "Dullboy" ? "Summers" : "Dullboy";

  //this is where the actual update happens
  let update = new CustomerUpdate(false);
  update.id = id;
  // set the version number - it must match with Square for the update to happen- square will increment the value automatially
  update.version = customer.version;
  // set the data you want to change
  // you can chain or set individual properties
  update.chainSet().firstName(firstName).lastName(lastName);

  let updateResponse = update.makeRequest(secret);
  return updateResponse;
}

async function testRetrieve() {
  let testCustomerSqID = await fetchIndexZeroCustomerId();
  let retrieve = new CustomerRetrieve(false);
  retrieve.id = testCustomerSqID;
  let customer = await retrieve.makeRequest(secret);
  return customer.customer;
}

async function testDelete() {
  let sandbox = false;
  let deleteCustomer = new CustomerDelete(sandbox);
  deleteCustomer.id = await fetchIndexZeroCustomerId();
  let vaporized = await deleteCustomer.makeRequest(secret);
  return vaporized;
}

// to silence the lam... errr, eslint
let str1 = "a";
let str2 = "b";

if (str1 === str2) {
  testList();
  testSearchLimit();
  testSearchPhone();
  testSortSearchDown();
  testSortSearchUp();
  testUpdate();
  testRetrieve();
  testDelete();
}

testList();
