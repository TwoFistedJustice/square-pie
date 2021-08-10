require("dotenv").config();
const secret = process.env.SQUARE_SANDBOX;
const fetch = require("node-fetch");
const { v4: uuid4 } = require("uuid");
uuid4();
const config = require("../src/config");
const { sampleCustomers } = require("./sampleData");
const customers = sampleCustomers();
const buffy = customers.buffy;
const jason = customers.jason;
const fred = customers.fred;
const freddie = customers.freddie;

// not every request to this gets a person argument so don't try to access its properties
const squareCustomer = async function (method, endpoint, person) {
  console.log(`method: ${method}\nendpoint: ${endpoint}`);
  let _headers = {
    "Square-Version": `${config.square.api_version}`,
    "Content-Type": `${config.http_headers.content_type}`,
    Accept: `${config.http_headers.Accept}`,
    Authorization: `Bearer ${secret}`,
  };

  let options = {
    method: method,
    headers: _headers,
    body: JSON.stringify(person),
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
  console.log(person.given_name);
  person.idempotency_key = uuid4();
  let request = await squareCustomer("post", undefined, person);
  return request;
}; // END fn

const setUpCustomerDBForTests = async function () {
  // count the customers stored in sandbox
  let customerList = await list();
  //if there are none, add four and return
  if (!customerList) {
    await addCustomer(buffy);
    await addCustomer(jason);
    await addCustomer(fred);
    await addCustomer(freddie);
    return;
  }
  // if there are some, delete them all then add four
  customerList.forEach(async (customer) => {
    await squareCustomer("delete", customer.id);
  });
  await addCustomer(buffy);
  await addCustomer(jason);
  await addCustomer(fred);
  await addCustomer(freddie);
}; // END fn

(async () => {
  await setUpCustomerDBForTests();
  return true;
})();
