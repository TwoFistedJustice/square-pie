const Order_Object = require("./stub.order_object");
const { define } = require("./utilities_curry");

class Order_Fulfillment extends Order_Object {
  constructor() {
    super();
  }

  #proposed(fulfillment) {
    let state = "PROPOSED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }

  #reserved(fulfillment) {
    let state = "RESERVED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }
  #prepared(fulfillment) {
    let state = "PREPARED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }
  #completed(fulfillment) {
    let state = "COMPLETED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }
  #canceled(fulfillment) {
    let state = "CANCELED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }
  #failed(fulfillment) {
    let state = "FAILED";
    !Object.prototype.hasOwnProperty.call("state")
      ? define(fulfillment, "state", state)
      : (fulfillment.state = state);
  }

  build_common() {
    let methods = function () {
      let fulfillment = {
        uid: "set with nanoid to length of 10",
        type: "PICKUP SHIPMENT", // there can be only one
      };
      const properties = {
        self: this,

        proposed: function () {
          this.self.#proposed(fulfillment);
          return this;
        },
        reserved: function () {
          this.self.#reserved(fulfillment);
          return this;
        },
        prepared: function () {
          this.self.#prepared(fulfillment);
          return this;
        },
        completed: function () {
          this.self.#completed(fulfillment);
          return this;
        },
        canceled: function () {
          this.self.#canceled(fulfillment);
          return this;
        },
        failed: function () {
          this.self.#failed(fulfillment);
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
