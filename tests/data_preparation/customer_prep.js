require("dotenv").config();
const secret = process.env.SQUARE_SANDBOX;
const fetch = require("node-fetch");
const { v4: uuid4 } = require("uuid");
uuid4();
const config = require("../../src/config");

// not every request to this gets a person argument so don't try to access its properties
const square_customer = async function (method, endpoint, person) {
  // console.log(`method: ${method}\nendpoint: ${endpoint}\n`);
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

const customer_list = async function () {
  let _list = await square_customer("get");
  return _list.customers;
}; // END fn

const customer_add = async function (person) {
  // console.log(person.given_name);
  person.idempotency_key = uuid4();
  let request = await square_customer("post", undefined, person);
  return request;
}; // END fn

module.exports = {
  square_customer,
  customer_list,
  customer_add,
};
