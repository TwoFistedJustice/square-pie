require("dotenv/config");
const { sampleCustomers } = require("./sample_data");
const secret = process.env.SANDBOX;
const testCustomers = sampleCustomers();

const {
  CustomerList,
  CustomerSearch,
  CustomerUpdate,
  CustomerRetrieve,
  CustomerDelete,
  CustomerCreate,
} = require("../src/customer_requests");

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
  var list = new CustomerList();
  let customerList = await list.makeRequest();
  console.log(`Toal objects: ${customerList.customers.length}`);
  console.log(customerList.customers);
  return customerList;
}

async function testCreate() {
  let someGuy = new CustomerCreate(testCustomers.amelia);
  // let someGuy = new CustomerCreate();
  // someGuy.customer = testCustomers.amelia;
  // someGuy.customer = testCustomers.mikey;
  // someGuy.customer = testCustomers.freddie;
  // someGuy.customer = testCustomers.jason;
  // someGuy.customer = testCustomers.fred;
  // someGuy.customer = testCustomers.buffy;
  let response = await someGuy.makeRequest();
  return response;
}

async function testSearchLimit() {
  let search = new CustomerSearch();
  search.query().fuzzy().email("fred").limit(1);
  let response = await search.makeRequest();
  console.log("expect ONE fred to come back- Either one okay");
  return response;
}

async function testSearchPhone() {
  let search = new CustomerSearch();
  search.query().fuzzy().email("fred").phone("77");
  let response = await search.makeRequest();
  console.log("expect ONE fred to come back - FLINTSTONE");
  return response;
}

async function testSortSearchDown() {
  let search = new CustomerSearch();
  search.query().fuzzy().sortDown().sortByName();
  return await search.makeRequest();
}

async function testSortSearchUp() {
  let search = new CustomerSearch();
  search.query().fuzzy().sortUp().sortByName();
  return await search.makeRequest();
}

async function testUpdate() {
  // first you need the customer ID
  let id = await fetchIndexZeroCustomerId();
  // then you need to get the current data as stored on Square
  // you need the current version number in order to update
  // the version number is a property on the returned customer
  let retrieve = new CustomerRetrieve(id);
  let retrieveResponse = await retrieve.makeRequest();
  let customer = retrieveResponse.customer;

  // just auto switching some variables to faciliate testing
  let firstName = customer.given_name === "Jack" ? "Buffy" : "Jack";
  let lastName = customer.family_name === "Dullboy" ? "Summers" : "Dullboy";

  //this is where the actual update happens
  let update = new CustomerUpdate(id);
  // update.id = id;
  // set the version number - it must match with Square for the update to happen- square will increment the value automatially
  update.version = customer.version;
  // set the data you want to change
  // you can chain or set individual properties
  update.chainSet().firstName(firstName).lastName(lastName);

  let updateResponse = await update.makeRequest(secret);
  console.log(updateResponse);
  return updateResponse;
}

async function testRetrieve() {
  let id = await fetchIndexZeroCustomerId();
  let retrieve = new CustomerRetrieve(id);
  let customer = await retrieve.makeRequest();
  console.log(customer);
  return customer.customer;
}

async function testDelete() {
  let id = await fetchIndexZeroCustomerId();
  let deleteCustomer = new CustomerDelete(id);
  let vaporized = await deleteCustomer.makeRequest();
  console.log(vaporized);
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

// testList();
// testRetrieve();
// testUpdate();
// testDelete();
testList();
// testCreate();
