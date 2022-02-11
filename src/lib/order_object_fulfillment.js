const { nanoid } = require("nanoid");
const {
  define,
  shazam_max_length,
  shazam_is_time_RFC3339,
} = require("./utilities");
const { uid_length } = require("./pie_defaults");
const order_fulfillment_state = require("./enum/order_fulfillment_enum");
const man =
  "sets up details on how to fulfill the order. \n" +
  "This class has two specialized make-methods in addition to the normal one.." +
  "make_shipment() lets you add shipping details.\n" +
  "make_pickup() lets you add pickup details.\n" +
  "They are both one and done type methods. You don't need to add their output to anything. It is automatic.\n" +
  "\nhttps://developer.squareup.com/reference/square/objects/OrderFulfillment";

/** @class Order_Fulfillment
 * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
 * {@link https://developer.squareup.com/reference/square/objects/OrderFulfillment | Square Docs}
 * */

class Order_Fulfillment {
  _display_name = "Order_Fulfillment";
  _last_verified_square_api_version = "2021-07-21";
  _help = this.display_name + ": " + man;

  constructor() {
    this._fardel = {
      uid: "uid_order_fulfillment#" + nanoid(uid_length),
      state: undefined,
      type: undefined,
      pickup_details: undefined,
      shipment_details: undefined,
    };
    this.configuration = {
      maximums: {
        uid: 60,
        cancel_reason: 100,
        failure_reason: 100,
        note: 500,
        carrier: 50,
        shipping_type: 50,
        curbside_details: 250,
        customer_id: 191,
        display_name: 255,
        email_address: 255,
        tracking_number: 100,
        tracking_url: 2000,
        phone_number: 17,
      },
    };
  }

  // GETTERS
  get display_name() {
    return this._display_name;
  }
  get square_version() {
    return `The last verified compatible Square API version is ${this._last_verified_square_api_version}`;
  }
  get help() {
    return this._help;
  }
  get uid() {
    return this._fardel.uid;
  }
  get state() {
    return this._fardel.state;
  }
  get type() {
    return this._fardel.type;
  }

  get fardel() {
    return this._fardel;
  }

  get pickup_details() {
    return this._fardel.pickup_details;
  }
  get shipment_details() {
    return this._fardel.shipment_details;
  }

  get limits() {
    return this.configuration.maximums;
  }

  // SETTERS
  set uid(uid) {
    this._fardel.uid = uid;
  }
  set state(str) {
    this._fardel.state = str;
  }
  set type(str) {
    this._fardel.type = str;
  }

  set pickup_details(obj) {
    // do not call a setter from another setter - bad things happen
    this._fardel.shipment_details = undefined;
    this._fardel.pickup_details = obj;
  }

  set shipment_details(obj) {
    // do not call a setter from another setter - bad things happen
    this._fardel.pickup_details = undefined;
    this._fardel.shipment_details = obj;
  }

  // PRIVATE METHODS
  /** @function #enum_state
   *  Enumerated methods set specific values from a limited set of allowable values defined by Square.
   *  For each value, a sub-method will exist that is the lowercase version of that value. There may also
   *  exist abbreviated aliases.
   *
   *  Enumerated methods are usually called by other functions and set the value on the object on which
   *  the calling function operates.
   * @private
   * @param {object} calling_this - pass in the calling function's 'this'
   * @method proposed sets value to "PROPOSED"
   * @method reserved sets value to "RESERVED"
   * @method prepared sets value to "PREPARED"
   * @method completed sets value to "COMPLETED"
   * @method canceled sets value to "CANCELED"
   * @method failed sets value to "FAILED"
   
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/enums/OrderFulfillmentState | Square Docs}
   * @example
   *  If you were allowed to choose from the set ["GOOD", "BAD", "UGLY"] in order to set the
   *  value of `clint` on the object 'western'
   *
   *  vyMar.make_western().clint.().good() => const spaghetti = {western : {clint: "GOOD"}}
   * */
  #enum_state(self, calling_this) {
    return order_fulfillment_state.state(self, calling_this);
  }

  /**@function  time_date
   * @private
   * @param {fulfillment object} fulfillment
   * @param {string} key - the name of the property you want to create
   * @param {string} time - RFC3339 compliant date-time
   * @throws Throws an error if time is not RFC3339 compliant
   * @return Creates a key:value pair on the object passed in
   * */

  #time_date(fulfillment, key, time) {
    if (shazam_is_time_RFC3339(time, this.display_name, "#time_date")) {
      !Object.prototype.hasOwnProperty.call(fulfillment, key)
        ? define(fulfillment, key, time)
        : (fulfillment[key] = time);
    }
  }

  /**@function note
   * @private
   * @param {fulfillment object} fulfillment
   * @param {string} key - the name of the property you want to create
   * @param {string} note - a string you want to persist
   * @throws Throws an error if note exceeds character limit (varies according to usage)
   * @return Creates a key:value pair on the object passed in
   * */
  #note(fulfillment, key, note) {
    let limit = this.configuration.maximums[key];
    if (shazam_max_length(note, limit, this.display_name, "#note")) {
      !Object.prototype.hasOwnProperty.call(fulfillment, key)
        ? define(fulfillment, key, note)
        : (fulfillment[key] = note);
    }
  }

  #schedule_type(fulfillment, key, value) {
    !Object.prototype.hasOwnProperty.call(fulfillment, key)
      ? define(fulfillment, key, value)
      : (fulfillment[key] = value);
  }

  /** @function make()  method of SOME_CLASS - method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @private
   * @method customer_id
   * @param {string} id -
   * @method display_name
   * @param {string} name -
   * @method email
   * @param {string} email -
   * @method phone
   * @param {string} phone -
   * @method address
   * @param {object} address_object - a fully formed and compliant Square Address Object
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/OrderFulfillmentRecipient | Square Docs}
   * */

  #recipient(fulfillment) {
    let display_name = this.display_name;
    let key = "recipient";
    let recipient = {
      customer_id: undefined,
      display_name: undefined,
      email_address: undefined,
      phone_number: undefined,
      address: undefined,
    };
    !Object.prototype.hasOwnProperty.call(fulfillment, key)
      ? define(fulfillment, key, recipient)
      : (fulfillment[key] = recipient);

    return {
      self: this,
      customer_id: function (id) {
        if (
          shazam_max_length(
            id,
            this.self.configuration.customer_id,
            display_name,
            key
          )
        ) {
          fulfillment.recipient.customer_id = id;
          return this;
        }
      },
      display_name: function (name) {
        if (
          shazam_max_length(
            name,
            this.self.configuration.display_name,
            display_name,
            key
          )
        ) {
          fulfillment.recipient.display_name = name;
          return this;
        }
      },
      email: function (email) {
        if (
          shazam_max_length(
            email,
            this.self.configuration.email_address,
            display_name,
            key
          )
        ) {
          fulfillment.recipient.email_address = email;
          return this;
        }
      },
      phone: function (phone) {
        if (
          shazam_max_length(
            phone,
            this.self.configuration.phone_number,
            display_name,
            key
          )
        ) {
          fulfillment.recipient.phone_number = phone;
          return this;
        }
      },
      address: function (address_object) {
        fulfillment.recipient.address = address_object;
        return this;
      },
    };
  }

  // MAKE METHODS

  /** @function make_pickup()  method of Order_Fulfillment - Makes and sets a compliant pickup object.
   *
   * Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method state - Enumerated. Calls #enum_state().
   * @method cancel_reason - sets `cancel_reason` to the value you pass and `state` to "CANCELED" and .
   * @param {string} str -
   * @method cancel - alias of cancel_reason
   * @method auto_complete_duration
   * @param {string} time - RFC3339 time string
   * @method expires_at
   * @param {string} time - RFC3339 time string
   * @method pickup_at
   * @param {string} time -
   * @method pickup_window_duration
   * @param {string} time - use one of the Pie duration utilities to easily construct a compliant duration string.
   * @method prep_time_duration
   * @param {string} time - use one of the Pie duration utilities to easily construct a compliant duration string.
   * @method note
   * @param {string} str -
   * @method asap - sets `schedule_type` to "ASAP"
   * @method scheduled - sets `schedule_type` to "SCHEDULED"
   * @method recipient - calls #recipient()
   * @param {string}  str -
   * @method curbside_details - sets `curbside_details` to the value you pass and `is_curbside_pickup` to true.
   * @param {string}  -
   * @method buyer_arrived_at
   * @param {string} time - RFC3339 time string
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   *
   * */
  make_pickup() {
    this.type = "PICKUP";
    this.pickup_details = {};
    let fulfillment = this._fardel.pickup_details;

    return {
      self: this,
      state: function () {
        return this.self.#enum_state(this.self, this);
      },
      cancel_reason: function (str) {
        let key = "cancel_reason";
        this.self.#enum_state(this.self, this).canceled();
        this.self.#note(fulfillment, key, str);
        return this;
      },
      cancel: function (str) {
        return this.cancel_reason(str);
      },
      // You can use one of the duration utilities to make a compliant string
      auto_complete_duration: function (time) {
        let key = "auto_complete_duration";
        fulfillment[key] = time;
        return this;
      },
      expires_at: function (time) {
        let key = "expires_at";
        this.self.#time_date(fulfillment, key, time);
        return this;
      },
      pickup_at: function (time) {
        let key = "pickup_at";
        this.self.#time_date(fulfillment, key, time);
        return this;
      },
      pickup_window_duration: function (time) {
        let key = "pickup_window_duration";
        this.self.#time_date(fulfillment, key, time);
        return this;
      },
      prep_time_duration: function (time) {
        let key = "prep_time_duration";
        this.self.#time_date(fulfillment, key, time);
        return this;
      },
      note: function (str) {
        let key = "note";
        this.self.#note(fulfillment, key, str);
        return this;
      },
      asap: function () {
        let value = "ASAP";
        this.self.#schedule_type(fulfillment, "schedule_type", value);
        return this;
      },
      scheduled: function () {
        let value = "SCHEDULED";
        this.self.#schedule_type(fulfillment, "schedule_type", value);
        return this;
      },
      recipient: function () {
        return this.self.#recipient(fulfillment);
      },
      curbside_details: function (str) {
        let key = "curbside_details";
        this.self.#note(fulfillment, key, str);
        this.self._fardel.pickup_details.is_curbside_pickup = true;
        return this;
      },
      buyer_arrived_at: function (time) {
        let key = "buyer_arrived_at";
        this.self.#time_date(fulfillment, key, time);
        return this;
      },
    };
  }

  /** @function make_shipment()  method of Order_Fulfillment - Makes and sets a compliant shipment object.
   *
   * Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method state - Enumerated. Calls #enum_state().
   * @method expected_shipped_at
   * @param {string} time - RFC3339 time string
   * @method cancel_reason - sets `cancel_reason` to the value you pass and `state` to "CANCELED" and .
   * @param {string} str -
   * @method cancel - alias of cancel_reason
   * @method failure_reason - sets failure_reason to value passed and state to "FAILED"
   * @param {string} str -
   * @method tracking_number
   * @param {string} str -
   * @method shipping_note
   * @param {string} str -
   * @method note
   * @param {string} str -
   * @method tracking_url
   * @param {string} str -
   * @method shipping_type
   * @param {string} str -
   * @method carrier
   * @param {string} str -
   * @method recipient - calls #recipient()
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://developer.squareup.com/reference/square/objects/OrderFulfillmentShipmentDetails | Square Docs}
   * @example
   *  You must use parentheses with every call to make and with every sub-method. If you have to make a lot
   *  of calls from different lines, it will reduce your tying and improve readability to set make() to a
   *  variable.
   *  let make = myVar.make();
   *   make.gizmo()
   *   make.gremlin()
   * */
  make_shipment() {
    this.type = "SHIPMENT";
    this.shipment_details = {};
    let fulfillment = this._fardel.shipment_details;

    return {
      self: this,
      state: function () {
        return this.self.#enum_state(this.self, this);
      },
      expected_shipped_at: function (time) {
        let key = "expected_shipped_at";
        this.self.#time_date(fulfillment, key, time);
        return this;
      },
      cancel_reason: function (str) {
        let key = "cancel_reason";
        this.self.#enum_state(this.self, this).canceled();
        this.self.#note(fulfillment, key, str);
        return this;
      },
      cancel: function (str) {
        return this.cancel_reason(str);
      },
      failure_reason: function (str) {
        let key = "failure_reason";
        this.self.#enum_state(this.self, this).failed();
        this.self.#note(fulfillment, key, str);
        return this;
      },
      tracking_number: function (str) {
        let key = "tracking_number";
        this.self.#note(fulfillment, key, str);
        return this;
      },
      shipping_note: function (str) {
        let key = "shipping_note";
        this.self.#note(fulfillment, key, str);
        return this;
      },
      note: function (str) {
        return this.shipping_note(str);
      },
      tracking_url: function (str) {
        let key = "tracking_url";
        this.self.#note(fulfillment, key, str);
        return this;
      },
      shipping_type: function (str) {
        let key = "shipping_type";
        this.self.#note(fulfillment, key, str);
        return this;
      },
      carrier: function (str) {
        let key = "carrier";
        this.self.#note(fulfillment, key, str);
        return this;
      },
      recipient: function () {
        return this.self.#recipient(fulfillment);
      },
    };
  }

  /** @function make()  method of Order_Fulfillment - Do not use this unless you have pre-built pickup or
   * shipment objects. Rather use make_pickup() or make_shipment().
   *
   * Method names are exactly the same as the property names listed
   * in the Square docs. There may be additional methods and/or shortened aliases of other methods.
   * @method uid - automatically set. Use this only to replace the generated uid.
   * @param {string} uid -
   * @method state
   * @param {string} str -
   * @method type
   * @param {string} str -
   * @method pickup_details
   * @param {object} obj - a fully formed compliant pickup object. Use only if you already have a compliant object. Otherwise, use make_pickup().
   * @method shipment_details
   * @param {object} obj - a fully formed compliant shipment object. Use only if you already have a compliant object. Otherwise, use make_shipment().
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
      uid: function (uid) {
        this.self.uid = uid;
        return this;
      },
      state: function () {
        return this.self.#enum_state(this.self, this);
      },
      type: function (str) {
        this.self.type = str;
        return this;
      },
      pickup_details: function (obj) {
        this.self.pickup_details = obj;
        return this;
      },
      shipment_details: function (obj) {
        this.self.shipment_details = obj;
        return this;
      },
    };
  }
}

module.exports = Order_Fulfillment;
