require("dotenv").config();
const fetch = require("node-fetch");
const { v4: uuid4 } = require("uuid");
uuid4();
const config = require("../src/config");
const secret = process.env.SANDBOX;
const { buffy, jason } = require("./sampleData");

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
    await addCustomer(jason);
    return;
  }
  // if there are some, delete them all then add two
  customerList.forEach(async (customer) => {
    await squareCustomer("delete", customer.id);
  });
  await addCustomer(buffy);
  await addCustomer(jason);

  // call list again
  // if list is emtpy, retry until it works
  // terminate after 20 tries or 30 seconds
  // several packages called 'jest-retry'
  //https://openbase.com/js/jest-retry/documentation
  //https://www.npmjs.com/package/jest-retry
  // https://www.npmjs.com/package/jest-retries
}; // END fn

(async () => {
  await setUpCustomerDBForTests();
  return true;
})();
