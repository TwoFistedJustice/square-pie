const Order_Request = require("./order_request");

class Order_Search extends Order_Request {
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

  // TODO --  HANDY DANDY METHODS
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
