// build 'batch'first and see if it can do just one
// if it can, don't build the single retrieve

const Order_Request = require("./order_request_abstract");
const { shazam_max_length_array, shazam_is_array } = require("./utilities");
const man =
  "retrieves one or more orders based on Square id of the order document. Add ids one at a time\n" +
  'by calling make().order("id1").order("id2") ...  or you can add an array of order_ids by calling\n' +
  "make().concat_orders(array_of_ids). You can use any combination of these methods.\n" +
  'Add the location_id by calling make().location("location_id")' +
  "\nhttps://developer.squareup.com/reference/square/orders-api/batch-retrieve-orders";

/** @class Order_Retrieve representing a http request to retrieve one or more orders
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/orders-api/batch-retrieve-orders | Square Docs}
 * */
class Order_Retrieve extends Order_Request {
  _display_name = "Order_Retrieve";
  _last_verified_square_api_version = "2021-11-17";
  _help = this.display_name + ": " + man;

  /**
   * Creates an instance of an http request to retrieve orders
   *  */
  constructor() {
    super();
    this._method = "POST";
    this._endpoint = "/batch-retrieve";
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
  /**@function  set order_array_concat
   * @param {array} arr - an array of ids not longer than 100
   * @throws {Error} Throws an error if the any array or combination of arrays exceeds a length of 100
   * @throws {Error} Throws an error if the argument is not an array
   * @return Replaces the existing array with a new one consisting of the old one plus the one you passed in.
   * */
  set order_array_concat(arr) {
    let caller = "order_array_concat";
    let limit = this.configuration.maximums.order_ids;
    // check that arr is an array and that the existing array does not exceed allowable length
    if (
      shazam_is_array(arr, this.display_name, caller) &&
      shazam_max_length_array(
        limit,
        this._body.order_ids,
        this.display_name,
        `${caller}.existing_length`
      )
    ) {
      let joined_array = this._body.order_ids.concat(arr);
      // check that joined array is less than limit + 1 (bc joined can be UP TO the limit)
      if (
        shazam_max_length_array(
          limit + 1,
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

  /** @function make()  method of Order_Retrieve - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method location_id
   * @param {string} id -
   * @method order_ids
   * @param {string} id -
   * @method order - alias of order_ids
   * @method location - alias of location_ids
   * @method concat_orders - adds the contents of an array of IDs to the order_ids array
   * @param {array} array - an array of order_ids
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   * */
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
      location: function (id) {
        return this.location_id(id);
      },
      concat_orders: function (array) {
        this.self.order_array_concat = array;
        return this;
      },
    };
  }
}

module.exports = Order_Retrieve;
