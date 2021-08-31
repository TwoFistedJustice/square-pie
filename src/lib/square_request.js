require("dotenv").config();
const fetch = require("node-fetch");
const config = require("../config");
const secret = process.env[`${config.secrets.sandbox_secret_name}`];

//-----------------------------------------------
// TOP LEVEL CLASSES aka LEVEL ONE CLASSES
//-----------------------------------------------

/*-----------------------------------------------

  REFACTOR

  Have it fetch the secret from process.env
  Have two separate key vars one for sbox one for production

-----------------------------------------------*/

// instantiate the class with a boolean
// before calling class.makeRequest(secret) you have to get the secret from wix
// by calling getSecret(class.secretName)

class Square_Request {
  constructor() {
    this._method = "";
    this._body;
    this._endpoint = "";
    this._secret = secret;
    this._delivery;
  }

  // GETTERS
  get method() {
    return this._method;
  }
  get body() {
    return this._body;
  }

  get delivery() {
    return this._delivery;
  }

  // SETTERS
  set body(val) {
    this._body = val;
  }
  set method(method) {
    this._method = method;
  }

  set delivery(parcel) {
    this._delivery = parcel;
  }
  // COMPUTED PROPERTIES
  get secretName() {
    return process.env.NODE_ENV === "production"
      ? `${config.secrets.production_secret_name}`
      : `${config.secrets.sandbox_secret_name}`;
  }
  get baseUrl() {
    return process.env.NODE_ENV === "production"
      ? `https://connect.squareup.com/v2/${this._apiName}`
      : `https://connect.squareupsandbox.com/v2/${this._apiName}`;
  }
  get url() {
    return `${this.baseUrl}${this._endpoint}`;
  }

  // METHODS
  headers() {
    return {
      "Square-Version": `${config.square.api_version}`,
      "Content-Type": `${config.http_headers.content_type}`,
      Accept: `${config.http_headers.Accept}`,
      Authorization: `Bearer ${this._secret}`,
    };
  }
  // you have to get the secret before calling this method
  makeRequest() {
    let request = async (url, options) => {
      const httpResponse = await fetch(url, options);
      this.delivery = await httpResponse.json();
      if (!httpResponse.ok) {
        let errors = this.delivery.errors[0];
        let squareErrorMessage = `\n${errors.category}\n${errors.code}\n${errors.field}\n${errors.detail}`;
        let apiErrorMessage = `\ngenerated url: ${this.url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}/n`;
        let message = squareErrorMessage + apiErrorMessage;
        throw new Error(message);
      }
      // let response = await httpResponse.json();
      // save the data returned from the server AND return it.
      return this.delivery;
    };
    return request(this.url, this.options());
  }
  options() {
    return {
      method: this._method,
      headers: this.headers(),
      body: JSON.stringify(this._body),
    };
  }
} // END class

module.exports = Square_Request;
