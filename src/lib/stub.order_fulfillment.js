const Order_Object = require("./stub.order_object");
const { nanoid } = require("nanoid");
const { isRFC3339 } = require("validator");
const { define, maxLength } = require("./utilities_curry");

//todo refactor this to be a free standing object taht gets added to an order
// find the common props and put them in fardel

class Order_Fulfillment extends Order_Object {
  constructor() {
    super();
    this._fardel = {
      uid: nanoid(10),
      state: undefined,
      type: undefined,
      // todo remove pickup details once constructor methods are built
      pickup_details: {
        cancel_reason: "", //limit 100
        curbside_pickup_details: {
          curbside_details: "", //limit
        },
      },
      // todo remove shipment details once constructor methods are built
      shipment_details: {
        cancel_reason: "", //limit 100
        failure_reason: "", //limit 100
        carrier: "", // limit 50
        expected_shipped_at: "time",

        recipient: {
          address: {
            // standard address object same as customer
            // todo build utility to create
            // add the utilty to customer objects
          },
          customer_id: "", //limit 191
          display_name: "", //limit 255
          email_address: "", //limit 255
          phone_number: "", //limit 17
        },
      },
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
        display_name: 255,
        email_address: 255,
        tracking_number: 100,
        tracking_url: 2000,
        phone_number: 17,
      },
    };
  }

  #proposed_state(fulfillment) {
    let state = "PROPOSED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }

  #reserved_state(fulfillment) {
    let state = "RESERVED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }
  #prepared_state(fulfillment) {
    let state = "PREPARED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }
  #completed_state(fulfillment) {
    let state = "COMPLETED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }
  #canceled_state(fulfillment) {
    let state = "CANCELED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }
  #failed_state(fulfillment) {
    let state = "FAILED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
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
    !Object.prototype.hasOwnProperty.call(key)
      ? define(fulfillment, key, time)
      : (fulfillment[key] = time);
  }

  //args: fulfillment object, property key, the note
  // call maxlength on the note
  // the limit uses the key to look up the length limit in super.configuration
  // if it passes
  // use ternary to
  // call define() and pass it all three args - as in the build state methods
  // todo limit
  #note(fulfillment, key, note) {
    let limit = this.fardel.lengthLimits[key];
    if (maxLength(note, limit)) {
      !Object.prototype.hasOwnProperty.call(key)
        ? define(fulfillment, key, note)
        : (fulfillment[key] = note);
    }
  }

  #schedule_type(fulfillment, key, value) {
    !Object.prototype.hasOwnProperty.call(fulfillment, key)
      ? define(fulfillment, key, value)
      : (fulfillment[key] = value);
  }

  // TODO - see pie_order_fulfillment.md
  //  remember to add an ADD() method
  build_shipment() {
    let methods = function () {
      let fulfillment = {
        uid: nanoid(10),
        type: "SHIPMENT",
      };
      const properties = {
        self: this,

        state_propose: function () {
          this.self.#proposed_state(fulfillment);
          return this;
        },
        state_reserve: function () {
          this.self.#reserved_state(fulfillment);
          return this;
        },
        state_prepare: function () {
          this.self.#prepared_state(fulfillment);
          return this;
        },
        state_complete: function () {
          this.self.#completed_state(fulfillment);
          return this;
        },
        state_cancel: function () {
          this.self.#canceled_state(fulfillment);
          return this;
        },
        state_fail: function () {
          this.self.#failed_state(fulfillment);
          return this;
        },
        // todo limit props
        cancel_reason: function (str) {
          let key = "cancel_reason";
          this.self.#note(fulfillment, key, str);
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
        clear_curbside: function () {
          fulfillment.is_curbside_pickup = false;
        },
      };
      return properties;
    };
    return methods();
  }

  // TODO - see pie_order_fulfillment.md
  //  remember to add an ADD() method
  build_pickup() {
    let methods = function () {
      let fulfillment = {
        uid: nanoid(10),
        type: "PICKUP",
      };
      const properties = {
        self: this,

        state_propose: function () {
          this.self.#proposed_state(fulfillment);
          return this;
        },
        state_reserve: function () {
          this.self.#reserved_state(fulfillment);
          return this;
        },
        state_prepare: function () {
          this.self.#prepared_state(fulfillment);
          return this;
        },
        state_complete: function () {
          this.self.#completed_state(fulfillment);
          return this;
        },
        state_cancel: function () {
          this.self.#canceled_state(fulfillment);
          return this;
        },
        state_fail: function () {
          this.self.#failed_state(fulfillment);
          return this;
        },
        expected_shipped_at: function (time) {
          let key = "expected_shipped_at";
          this.self.#time_date(fulfillment, key, time);
          return this;
        },
        cancel_reason: function (str) {
          let key = "cancel_reason";
          this.self.#note(fulfillment, key, str);
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
      };
      return properties;
    };
    return methods();
  }

  cancel_order() {
    // this handles cancel fulfilment props
    // sends uid and state: "CANCELED"
    // takes uid as argument
    // fills out all fields for cancellation
  }
}

module.exports = Order_Fulfillment;
