/**
 * Forget the mixin docs and examples online. They don't work with class 'this'
 * passing 'this' as an argument works without counter-intuitive syntax
 * */

const order_fulfillment_enum = {
  /** @state  an array of the allowable values on a property.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *
   * Use in make() for preventing the class setter from passing disallowed values
   * Do not use in the setter itself because it will be called every time
   * */

  allowable_values: {
    state: [
      "PROPOSED",
      "RESERVED",
      "PREPARED",
      "COMPLETED",
      "CANCELED",
      "FAILED",
    ],
    fulfillment_types: ["PICKUP", "SHIPMENT"],
  },

  /** @function state
   * @state  enables a referencing class to set only allowable values on a property.
   * @param {object} self - pass in 'this' from the referencing class.
   * @param {object} calling_this - pass in the calling function's 'this'
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #state() {
   *   return order_fulfillment_enum.state(this)
   * }
   * */

  state: function (self, calling_this) {
    return {
      proposed: function () {
        self.state = "PROPOSED";
        return calling_this;
      },
      reserved: function () {
        self.state = "RESERVED";
        return calling_this;
      },
      prepared: function () {
        self.state = "PREPARED";
        return calling_this;
      },
      completed: function () {
        self.state = "COMPLETED";
        return calling_this;
      },
      canceled: function () {
        self.state = "CANCELED";
        return calling_this;
      },
      failed: function () {
        self.state = "FAILED";
        return calling_this;
      },
    };
  },
  /** @function fulfillment_types_arrays - For search order query
   * @fulfillment_types  enables a referencing class to set only allowable values on a property.
   * @param {object} obj - pass in the object containing the array (NOT the array itself)
   * @param {object} calling_this - pass in the calling function's 'this'
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  `return order_fulfillment_enum.fulfillment_types_arrays(filter);`
   * */
  fulfillment_types_arrays: function (obj, calling_this) {
    return {
      pickup: function () {
        obj.fulfillment_types.push("PICKUP");
        return calling_this;
      },
      shipment: function () {
        obj.fulfillment_types.push("SHIPMENT");
        return calling_this;
      },
    };
  },

  /** @function fulfillment_state_arrays - For search order query
   * @fulfillment_states  enables a referencing class to set only allowable values on a property.
   * @param {object} obj - pass in the object containing the array (NOT the array itself)
   * @param {object} calling_this - pass in the calling function's 'this'
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  `return order_fulfillment_enum.fulfillment_state_arrays(filter);`
   * */

  fulfillment_state_arrays: function (obj, calling_this) {
    return {
      proposed: function () {
        obj.fulfillment_states.push("PROPOSED");
        return calling_this;
      },
      reserved: function () {
        obj.fulfillment_states.push("RESERVED");
        return calling_this;
      },
      prepared: function () {
        obj.fulfillment_states.push("PREPARED");
        return calling_this;
      },
      completed: function () {
        obj.fulfillment_states.push("COMPLETED");
        return calling_this;
      },
      canceled: function () {
        obj.fulfillment_states.push("CANCELED");
        return calling_this;
      },
      failed: function () {
        obj.fulfillment_states.push("FAILED");
        return calling_this;
      },
    };
  },

  /** @function state_filter_arrays - For search order query
   * @fulfillment_states  enables a referencing class to set only allowable values on a property.
   * @param {object} obj - pass in the object containing the array (NOT the array itself)
   * @param {object} calling_this - pass in the calling function's 'this'
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  `return order_fulfillment_enum.state_filter_arrays(filter);`
   * */

  state_filter_arrays: function (obj, calling_this) {
    return {
      open: function () {
        obj.states.push("OPEN");
        return calling_this;
      },
      completed: function () {
        obj.states.push("COMPLETED");
        return calling_this;
      },
      canceled: function () {
        obj.states.push("CANCELED");
        return calling_this;
      },
      draft: function () {
        obj.states.push("DRAFT");
        return calling_this;
      },
    };
  },
};

module.exports = order_fulfillment_enum;
