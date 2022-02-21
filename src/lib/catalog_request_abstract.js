const Square_Request = require("./square_request_abstract");

/**
 * @class Catalog_Request - super class of all Catalog Request classes
 * @abstract
 * */

class Catalog_Request extends Square_Request {
  _display_name = "Catalog_Request";
  constructor() {
    super();
    this._api_name = "catalog";
  }
}

module.exports = Catalog_Request;
