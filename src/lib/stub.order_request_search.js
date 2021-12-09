const Order_Request = require("./order_request_abstract");

/** @class Order_Search representing a search for an existing order.
 * @param {string} id - the id of the order you want to pay. You can also add this later. You must do this before calling .request()
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */
class Order_Search extends Order_Request {
  _display_name = "Order_Search";
  _last_verified_square_api_version = "2021-07-21";
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "search";
    this._body = {
      location_ids: undefined, // []
      cursor: undefined,
      limit: undefined, // num
      return_entries: undefined, //bool - if set to true returns only the object id,  location id, and version
      query: undefined, // {} (complex)
    };
    this._delivery;
  }
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get body() {
    return this._body;
  }

  get delivery() {
    return this._delivery;
  }

  set delivery(parcel) {
    this._body.return_entries === true
      ? (this._delivery = parcel.order_entries)
      : (this._delivery = parcel.orders);
  }

  // location add
  // location remove
  // merge array of locations

  // query - base on catalog search

  make() {
    return {
      self: this,
    };
  }
}

module.exports = Order_Search;
