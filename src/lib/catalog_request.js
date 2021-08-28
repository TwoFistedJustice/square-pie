const Square_Request = require("./square_request");

class Catalog_Request extends Square_Request {
  constructor() {
    super();
    this._apiName = "catalog";
  }
}

module.exports = Catalog_Request;
