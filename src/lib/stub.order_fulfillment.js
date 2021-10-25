const Order_Object = require("./stub.order_object");
const { nanoid } = require("nanoid");
const { isRFC3339 } = require("validator");
const { define, maxLength } = require("./utilities_curry");

class Order_Fulfillment extends Order_Object {
  constructor() {
    super();
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

  #time_date(fulfillment, key, value) {
    if (!isRFC3339(value)) {
      throw new Error("The time value provided must be in RFC 339 format.");
    }
    !Object.prototype.hasOwnProperty.call(key)
      ? define(fulfillment, key, value)
      : (fulfillment[key] = value);
  }

  //args: fulfillment object, property key, the note, the lengthlimter
  // call maxlength on the note
  // if it passes
  // use ternary to
  // call define() and pass it all three args - as in the build state methods
  #note(fulfillment, key, value, lengthlimiter) {
    if (maxLength(value, lengthlimiter)) {
      !Object.prototype.hasOwnProperty.call(key)
        ? define(fulfillment, key, value)
        : (fulfillment[key] = value);
    }
  }

  // TODO - see pie_order_fulfillment.md
  build_shipment() {
    let methods = function () {
      let fulfillment = {
        uid: nanoid(10),
        type: "PICKUP SHIPMENT", // there can be only one
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

        cancel_reason: function (str) {
          let limit = this.self.fardel.lengthLimits.fulfillment.cancel_reason;
          this.self.#note(fulfillment, "cancel_reason", str, limit);
          return this;
        },
      };
      return properties;
    };
    return methods();
  }

  // TODO - see pie_order_fulfillment.md
  build_pickup() {
    let methods = function () {
      let fulfillment = {
        uid: nanoid(10),
        type: "PICKUP SHIPMENT", // there can be only one
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

        cancel_reason: function (str) {
          let limit = this.self.fardel.lengthLimits.fulfillment.cancel_reason;
          this.self.#note(fulfillment, "cancel_reason", str, limit);
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
