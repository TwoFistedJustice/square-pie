require("dotenv").config();
const secret = process.env.SQUARE_SANDBOX;
const fetch = require("node-fetch");
const config = require("../../src/config");

// not every request to this gets a person argument so don't try to access its properties
const test_data_prep = async function (apiName, method, endpoint, payload) {
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
    body: JSON.stringify(payload),
  };
  let baseUrl = `https://connect.squareupsandbox.com/v2/${apiName}`;

  let url = endpoint !== undefined ? `${baseUrl}/${endpoint}` : baseUrl;

  let httpResponse = await fetch(url, options);

  if (!httpResponse.ok) {
    let message = `url: ${url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}`;
    throw new Error(message);
  }
  let response = await httpResponse.json();
  return response;
}; // END fn

module.exports = {
  test_data_prep,
};
