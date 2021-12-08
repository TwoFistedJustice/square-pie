// build 'batch'first and see if it can do just one
// if it can, don't build the single retrieve

const Order_Request = require("./order_request_abstract");
const { shazam_is_array } = require("../lib/utilities/aaa_index");

class Order_Retrieve extends Order_Request {
  _display_name = "Order_Retrieve";
  _last_verified_square_api_version = "2021-07-21";
  constructor(props) {
    super(props);
    this._method = "post";
    this._endpoint = "batch-retrieve";
    this._body = {
      location_id: undefined,
      order_ids: [], // [string,...]
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
  get location_id() {
    return this._body.location_id;
  }
  get order_ids() {
    return this._body.order_ids;
  }
  set location_id(id) {
    this._body.location_id = id;
  }
  set order_ids(id) {
    this._body.order_ids.push(id);
  }

  set order_array_concat(arr) {
    if (shazam_is_array(arr, this.display_name, "order_array_concat")) {
      let joined_array = this._body.order_ids.concat(arr);
      this._body.order_ids = joined_array;
    }
  }

  set delivery(parcel) {
    this._delivery = parcel.orders;
  }
  location(id) {
    this.location = id;
    return this;
  }
  clear_location() {
    this.location = undefined;
    return this;
  }

  add_order(id) {
    this.order_ids = id;
    return this;
  }

  add_array_of_orders(arr) {
    this.order_array_concat = arr;
    return this;
  }

  make() {
    return {
      self: this,
      location_id: function (id) {
        this.self.location_id = id;
        return this;
      },
      order_ids: function (id) {
        this.self.order_ids = id;
        return this;
      },
      order: function (id) {
        return this.order_ids(id);
      },
      concat_orders: function (array) {
        this.self.order_array_concat = array;
        return this;
      },
    };
  }
}

module.exports = Order_Retrieve;
