const fetch = require("node-fetch");
const should = require("chai").should();
const { v4: uuid4 } = require("uuid");
uuid4();
const config = require("../src/config");
const secret = process.env.SANDBOX;
const mikey = {
  given_name: "Michael",
  family_name: "Myers",
  email_address: "candyTime@iscream.org",
  address: {
    address_line_1: "86 Nowhere Is Safe Court",
    address_line_2: "",
    locality: "Haddonfield",
    administrative_district_level_1: "IL",
    postal_code: "60686",
    country: "US",
  },
  phone_number: "1-937-555-1031",
  reference_id: "Halloween-31",
  note: "want some candy?",
  preferences: {
    email_unsubscribed: false,
  },
};

const buffy = {
  given_name: "Buffy",
  family_name: "Summers",
  email_address: "buffy@magicbox.com",
  address: {
    address_line_1: "1630 Revello Drive",
    address_line_2: "",
    locality: "Sunnydale",
    administrative_district_level_1: "CA",
    postal_code: "95037",
    country: "US",
  },
  phone_number: "805-555-0833",
  reference_id: "1997-2003",
  note: "When did I get a sister?",
  preferences: {
    email_unsubscribed: false,
  },
};

const {
  CustomerList,
  // CustomerSearch,
  // CustomerUpdate,
  // CustomerRetrieve,
  // CustomerDelete,
  // CustomerCreate,
} = require("../src/CustomerRequests");

// ---------------------------------------------------
// Hardcoded http requests for the hooks
// Do not use the request classes to test themselves!
// ---------------------------------------------------

const squareCustomer = async function (method, endpoint, _body) {
  console.log(`method: ${method}\nendpoint: ${endpoint}\nbody: ${_body}`);
  let _headers = {
    "Square-Version": `${config.squareVersion}`,
    "Content-Type": `${config.contentType}`,
    Accept: `${config.Accept}`,
    Authorization: `Bearer ${secret}`,
  };

  let options = {
    method: method,
    headers: _headers,
    body: JSON.stringify(_body),
  };
  let baseUrl = `https://connect.squareupsandbox.com/v2/customers`;

  let url = endpoint !== undefined ? `${baseUrl}/${endpoint}` : baseUrl;

  let httpResponse = await fetch(url, options);

  if (!httpResponse.ok) {
    let message = `\nbefore customer tests hook:\nurl: ${url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}`;
    throw new Error(message);
  }
  let response = await httpResponse.json();
  return response;
}; // END fn

const list = async function () {
  let _list = await squareCustomer("get");
  return _list.customers;
}; // END fn

const addCustomer = async function (person) {
  person.idempotency_key = uuid4();
  let request = await squareCustomer("post", undefined, person);
  return request;
}; // END fn

const setUpCustomerDBForTests = async function () {
  // count the customers stored in sandbox
  let customerList = await list();
  //if there are none, add two and return
  if (!customerList) {
    await addCustomer(buffy);
    await addCustomer(mikey);
    return;
  }
  // if there are some, delete them all then add two
  customerList.forEach(async (customer) => {
    await squareCustomer("delete", customer.id);
  });
  await addCustomer(buffy);
  await addCustomer(mikey);

  // call list again
  // if list is emtpy, retry until it works
  // terminate after 20 tries or 30 seconds
  // several packages called 'jest-retry'
  //https://openbase.com/js/jest-retry/documentation
  //https://www.npmjs.com/package/jest-retry
  // https://www.npmjs.com/package/jest-retries
}; // END fn

beforeAll(async () => {
  await setUpCustomerDBForTests();
});

describe("Customer Request classes", () => {
  test("Should return the list of customers", async () => {
    let customerList = new CustomerList(false);
    let response = await customerList.makeRequest(secret);
    let customers = response.customers;
    // await expect(customers).to.be.an("Array").that.has.lengthOf(2);
    await customers.should.be.an("Array").that.has.lengthOf(2);
  });
});

// really need to slow Jest down... it runs
