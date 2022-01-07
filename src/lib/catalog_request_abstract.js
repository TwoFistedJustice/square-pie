const Square_Request = require("./square_request_abstract");

class Catalog_Request extends Square_Request {
  _display_name = "Catalog_Request";
  constructor() {
    super();
    this._api_name = "catalog";
  }
  get display_name() {
    return this._display_name;
  }
}

module.exports = Catalog_Request;
