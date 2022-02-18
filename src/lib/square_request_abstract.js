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
    this._delivery;
    this._id_array = [];
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
  get id_array() {
    return this._id_array;
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
  get #secretName() {
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
  #headers() {
    return {
      "Square-Version": `${config.square.api_version}`,
      "Content-Type": `${config.http_headers.content_type}`,
      Accept: `${config.http_headers.Accept}`,
      // Authorization: `Bearer ${this._secret}`,
      Authorization: `Bearer ${secret}`,
    };
  }
  request() {
    let http_request = async (url, options) => {
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
    return http_request(this.url, this.#options());
  }
  #options() {
    return {
      method: this._method,
      headers: this.#headers(),
      body: JSON.stringify(this._body),
    };
  }

  /** @function cache_ids - extracts the top layer of object ids out of the .delivery property
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  After you have made your http request
   *
   *  yourVar.cache_ids()
   *  yourVar.id_array => [id2, id2, id3]
   *
   *  if you wanted to use the output do some other action
   *  list.cache_ids()
   *  yourvar.make().concat(list.id_array)
   *
   * */

  cache_ids() {
    // if delivery is an array of ids, grab them
    if (Array.isArray(this._delivery)) {
      if (typeof this._delivery[0] === "string") {
        this.delivery.forEach((element) => {
          this._id_array.push(element);
        });
      } else {
        // if delivery is an array of objects, grab the ids
        this.delivery.forEach((doc) => {
          if (Object.prototype.hasOwnProperty.call(doc, "id")) {
            this._id_array.push(doc.id);
          }
        });
      }
    } else if (
      // if delivery is just one object, grab the id
      typeof this._delivery === "object" &&
      this._delivery !== null &&
      Object.hasOwnProperty.call(this._delivery, "id")
    ) {
      this._id_array.push(this.delivery.id);
    }
  }
} // END class

module.exports = Square_Request;
