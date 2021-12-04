const Square_Request = require("./square_request_abstract");

class Catalog_Request extends Square_Request {
  _display_name = "Catalog_Request";
  _last_verified_square_api_version = "2021-07-21";
  constructor() {
    super();
    this._api_name = "catalog";
  }
  V;
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
}

module.exports = Catalog_Request;
