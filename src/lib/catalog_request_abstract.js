const Square_Request = require("./square_request_abstract");

/** @class Catalog_Request - abstract super class of all Catalog Reqeust classes
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */

class Catalog_Request extends Square_Request {
  _display_name = "Catalog_Request";
  constructor() {
    super();
    this._api_name = "catalog";
  }
}

module.exports = Catalog_Request;
