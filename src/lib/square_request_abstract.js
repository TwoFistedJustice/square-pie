require("dotenv").config();
const fetch = require("node-fetch");
const config = require("../config");
const secret = process.env[`${config.secrets.sandbox_secret_name}`];
const man =
  "\nis the super class for all Square Pie REQUEST classes. It handles the actual http request when you call\n" +
  "subclass.request(). It also contains the GETTERS common to all request classes. You can customize your\n" +
  "configuration by changing the parameter stored in `config.js` or in `.env`\n" +
  "\nhttps://developer.squareup.com/reference/square";

/** @class Square_Request super class of all Square Pie Request classes
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */

class Square_Request {
  _display_name = "Square_Request";
  _help = this.display_name + ": " + man;
  constructor() {
    this._method = "";
    this._body;
    this._endpoint = "";
    this._secret = secret;
    this._delivery;
  }

  // GETTERS
  get display_name() {
    return this._display_name;
  }
  // for sub-classes
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get help() {
    return this._help;
  }
  get method() {
    return this._method;
  }
  get body() {
    return this._body;
  }
  get endpoint() {
    return this._endpoint;
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
  // todo, make this private
  get secretName() {
    return process.env.NODE_ENV === "production"
      ? `${config.secrets.production_secret_name}`
      : `${config.secrets.sandbox_secret_name}`;
  }
  get baseUrl() {
    return process.env.NODE_ENV === "production"
      ? `https://connect.squareup.com/v2/${this._api_name}`
      : `https://connect.squareupsandbox.com/v2/${this._api_name}`;
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
  request() {
    let http_request = async (url, options) => {
      // console.log(options.body);
      // console.log(options);
      const httpResponse = await fetch(url, options);
      this.delivery = await httpResponse.json();
      if (!httpResponse.ok) {
        let errors = this.delivery.errors[0];
        let squareErrorMessage = `\n${errors.category}\n${errors.code}\n${errors.field}\n${errors.detail}`;
        let apiErrorMessage = `\ngenerated url: ${this.url}\nmethod: ${options.method}\n${httpResponse.status}: ${httpResponse.statusText}`;
        let message = squareErrorMessage + apiErrorMessage;
        throw new Error(message);
      }
      // save the data returned from the server AND return it.
      return this.delivery;
    };
    return http_request(this.url, this.options());
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
