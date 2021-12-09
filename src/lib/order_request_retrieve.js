// build 'batch'first and see if it can do just one
// if it can, don't build the single retrieve

const Order_Request = require("./order_request_abstract");
const {
  shazam_max_length_array,
  shazam_max_length,
  shazam_is_array,
} = require("../lib/utilities/aaa_index");
/** @class Order_Retrieve representing a http request to retrieve one or more orders
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * */
class Order_Retrieve extends Order_Request {
  _display_name = "Order_Retrieve";
  _last_verified_square_api_version = "2021-11-17";
  /**
   * Creates an instance of an http request to retrieve orders
   *  */
  constructor() {
    super();
    this._method = "post";
    this._endpoint = "batch-retrieve";
    this._body = {
      location_id: undefined,
      order_ids: [], // [string,...]
    };
    this._delivery;
    this.configuration = {
      maximums: {
        order_ids: 100,
      },
    };
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
    let arr = this._body.order_ids.length;
    if (
      shazam_max_length_array(
        this.configuration.maximums.order_ids,
        arr,
        this.display_name,
        "order_ids"
      )
    ) {
      this._body.order_ids.push(id);
    }
  }
  /**
   * @param {array} arr - an array of ids not longer than 100
   * @throws {Error} Throws an error if the any array or combination of arrays exceeds a length of 100
   * @throws {Error} Throws an error if the argument is not an array
   * @return Replaces the existing array with a new one consisting of the old one plus the one you passed in.
   * */
  set order_array_concat(arr) {
    let caller = "order_array_concat";
    // check that arr is an array and that the existing array does not exceed allowable length
    if (
      shazam_is_array(arr, this.display_name, caller) &&
      shazam_max_length_array(
        this.configuration.maximums.order_ids,
        this._body.order_ids,
        this.display_name,
        `${caller}.existing_length`
      )
    ) {
      let joined_array = this._body.order_ids.concat(arr);
      // check that combined length would not exceed allowable length
      if (
        shazam_max_length(
          this.configuration.maximums.order_ids,
          joined_array,
          this.display_name,
          `${caller}.combined_length`
        )
      ) {
        this._body.order_ids = joined_array;
      }
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
