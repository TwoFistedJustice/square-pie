const Order_Object = require("./stub.order_object");
const { nanoid } = require("nanoid");
const { isRFC3339 } = require("validator");
const { define, maxLength } = require("./utilities");

class Order_Fulfillment extends Order_Object {
  constructor() {
    super();
    this._fardel = {
      uid: nanoid(10),
      state: undefined,
      type: undefined,
      pickup_details: undefined,
      shipment_details: undefined,
    };
    this.configuration = {
      lengthLimits: {
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
    return this.configuration.lengthLimits;
  }

  // SETTERS
  set uid(id) {
    this._fardel.uid = id;
  }
  set state(str) {
    this._fardel.state = str;
  }
  set type(str) {
    this._fardel.type = str;
  }

  set pickup_details(obj) {
    this._fardel.pickup_details = obj;
  }

  set shipment_details(obj) {
    this._fardel.shipment_details = obj;
  }

  // PRIVATE METHODS
  #proposed_state() {
    this.state = "PROPOSED";
  }
  #reserved_state() {
    this.state = "RESERVED";
  }
  #prepared_state() {
    this.state = "PREPARED";
  }
  #completed_state() {
    this.state = "COMPLETED";
  }
  #canceled_state() {
    this.state = "CANCELED";
  }
  #failed_state() {
    this.state = "FAILED";
  }

  //args: fulfillment object, property key (key), time in RFC339 (time)
  // call validator.isRFC3339(time)
  // if it passes muster
  // use ternary to
  // call define() and pass it all three args - as in the build state methods

  #time_date(fulfillment, key, time) {
    if (!isRFC3339(time)) {
      throw new Error("The time value provided must be in RFC 339 format.");
    }
    !Object.prototype.hasOwnProperty.call(fulfillment, key)
      ? define(fulfillment, key, time)
      : (fulfillment[key] = time);
  }

  //args: fulfillment object, property key, the note
  // call maxlength on the note
  // the limit uses the key to look up the length limit in super.configuration
  // if it passes muster
  // use ternary to
  // call define() and pass it all three args - as in the build state methods
  #note(fulfillment, key, note) {
    let limit = this.configuration.lengthLimits[key];
    if (maxLength(limit, note)) {
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

  #recipient(fulfillment) {
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
    let methods = () => {
      const properties = {
        self: this,
        customer_id: function (val) {
          if (maxLength(this.self.configuration.customer_id, val)) {
            fulfillment.recipient.customer_id = val;
            return this;
          }
        },
        display_name: function (val) {
          if (maxLength(this.self.configuration.display_name, val)) {
            fulfillment.recipient.display_name = val;
            return this;
          }
        },
        email: function (val) {
          if (maxLength(this.self.configuration.email_address, val)) {
            fulfillment.recipient.email_address = val;
            return this;
          }
        },
        phone: function (val) {
          if (maxLength(this.self.configuration.phone_number, val)) {
            fulfillment.recipient.phone_number = val;
            return this;
          }
        },
        address: function (val) {
          if (maxLength(this.self.configuration.address, val)) {
            fulfillment.recipient.address = val;
            return this;
          }
        },
      };
      return properties;
    };
    return methods();
  }

  build_pickup() {
    this.type = "PICKUP";
    this.pickup_details = {};
    let fulfillment = this._fardel.pickup_details;

    let methods = () => {
      const properties = {
        self: this,
        state_propose: function () {
          this.self.#proposed_state();
          return this;
        },
        state_reserve: function () {
          this.self.#reserved_state();
          return this;
        },
        state_prepare: function () {
          this.self.#prepared_state();
          return this;
        },
        state_complete: function () {
          this.self.#completed_state();
          return this;
        },
        state_cancel: function () {
          this.self.#canceled_state();
          return this;
        },
        state_fail: function () {
          this.self.#failed_state();
          return this;
        },

        cancel_reason: function (str) {
          let key = "cancel_reason";
          this.self.#canceled_state();
          this.self.#note(fulfillment, key, str);
          return this;
        },
        cancel: function (str) {
          this.cancel_reason(str);
          return this;
        },
        auto_complete_duration: function (time) {
          let key = "auto_complete_duration";
          this.self.#time_date(fulfillment, key, time);
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

      return properties;
    };
    return methods();
  }

  build_shipment() {
    this.type = "SHIPMENT";
    this.shipment_details = {};
    let fulfillment = this._fardel.shipment_details;
    let methods = () => {
      const properties = {
        self: this,

        state_propose: function () {
          this.self.#proposed_state();
          return this;
        },
        state_reserve: function () {
          this.self.#reserved_state();
          return this;
        },
        state_prepare: function () {
          this.self.#prepared_state();
          return this;
        },
        state_complete: function () {
          this.self.#completed_state();
          return this;
        },
        state_cancel: function () {
          this.self.#canceled_state();
          return this;
        },
        state_fail: function () {
          this.self.#failed_state();
          return this;
        },
        expected_shipped_at: function (time) {
          let key = "expected_shipped_at";
          this.self.#time_date(fulfillment, key, time);
          return this;
        },
        cancel_reason: function (str) {
          let key = "cancel_reason";
          this.self.#canceled_state();
          this.self.#note(fulfillment, key, str);
          return this;
        },
        cancel: function (str) {
          this.cancel_reason(str);
          return this;
        },
        failure_reason: function (str) {
          let key = "failure_reason";
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
          this.shipping_note(str);
          return this;
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
      return properties;
    };
    return methods();
  }
}

module.exports = Order_Fulfillment;
