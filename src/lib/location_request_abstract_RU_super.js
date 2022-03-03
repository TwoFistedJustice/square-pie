const Location_Request = require("./location_request_abstract");

/**
 * {@link https://developer.squareup.com/reference/square/locations-api |  **-------> Link To Square Docs <-------**}
 * @class Location_RU
 * @extends Square_Request
 * @param {id}  Sets the endpoint to the id your pass in.
 * @abstract
 * @ignore
 * @classdesc
 *
 * Super class of Location: Retrieve, Update
 * */

class Location_RU extends Location_Request {
  _display_name = "Location_RU";
  constructor(id) {
    super();
    this._endpoint = `/${id}`;
  }
  get id() {
    return this._endpoint;
  }
  set id(someId) {
    this._endpoint = `/${someId}`;
  }
}

module.exports = Location_RU;
