const Order_Object = require("./stub.order_object");
const { nanoid } = require("nanoid");
const { define } = require("./utilities_curry");

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

  #time_date() {
    //args: fulfillment object, property key (key), time in RFC339 (time)
    // call validator.isRFC3339(time)
    // if it passes muster
    // use ternary to
    // call define() and pass it all three args - as in the build state methods
  }

  #note() {
    //args: fulfillment object, property key, the note, the lengthlimter
    // call maxlength on the note
    // if it passes
    // use ternary to
    // call define() and pass it all three args - as in the build state methods
  }

  build_common() {
    let methods = function () {
      let fulfillment = {
        uid: nanoid(10),
        type: "PICKUP SHIPMENT", // there can be only one
      };
      const properties = {
        self: this,

        proposed: function () {
          this.self.#proposed_state(fulfillment);
          return this;
        },
        reserved: function () {
          this.self.#reserved_state(fulfillment);
          return this;
        },
        prepared: function () {
          this.self.#prepared_state(fulfillment);
          return this;
        },
        completed: function () {
          this.self.#completed_state(fulfillment);
          return this;
        },
        canceled: function () {
          this.self.#canceled_state(fulfillment);
          return this;
        },
        failed: function () {
          this.self.#failed_state(fulfillment);
          return this;
        },
      };
      return properties;
    };
    return methods();
  }

  // TODO - see pie_order_object.md
  build_fulfillment_shipment() {
    let methods = function () {
      const properties = { self: this };
      return properties;
    };
    return methods();
  }

  // TODO - see pie_order_object.md
  build_fulfillment_pickup() {
    let methods = () => {
      const properties = { self: this };
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
