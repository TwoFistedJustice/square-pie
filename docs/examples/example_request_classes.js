// start by requiring the top level request class
const Square_Request = require("../../src/lib/square_request");

//used for uid and name generation
const { nanoid } = require("nanoid/non-secure");

class Request_Super extends Square_Request {
  constructor() {
    super();
    this._apiName = "customers"; // this is whatever word comes after "/v2/ in the URL - no slashes
  }
} // END Request_Super

class Sub_Request extends Request_Super {
  constructor() {
    super();
    this.idempotency_key = nanoid();
    this._endpoint = "someWord";
    this._method = "put";
    this._body = {
      // if the request is sending an object, -fardel becomes _body
      // if the request is doing a search, _body will have its own properties
    };
    this._delivery; // response data will go here
  }
  // GETTERS - omitted for brevity

  // SETTERS
  // set any properties on _body
  set body(fardel) {
    this._body = fardel;
  }

  // this setter is called by Square_Request
  // - all you have to do is tell it which response body property to pull from
  set delivery(parcel) {
    this._delivery = parcel.someProperty; // whatever Square calls it for the particular endpoint
  }

  // METHODS
  make() {
    // follow the standard model
  }
}

module.exports = Sub_Request;
