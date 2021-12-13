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
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #state() {
   *   return order_fulfillment_enum.state(this)
   * }
   * */

  state: function (self) {
    return {
      proposed: function () {
        self.state = "PROPOSED";
        return this;
      },
      reserved: function () {
        self.state = "RESERVED";
        return this;
      },
      prepared: function () {
        self.state = "PREPARED";
        return this;
      },
      completed: function () {
        self.state = "COMPLETED";
        return this;
      },
      canceled: function () {
        self.state = "CANCELED";
        return this;
      },
      failed: function () {
        self.state = "FAILED";
        return this;
      },
    };
  },
  /** @function fulfillment_types_arrays - For search order query
   * @fulfillment_types  enables a referencing class to set only allowable values on a property.
   * @param {object} obj - pass in the object containing the array (NOT the array itself)
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  `return order_fulfillment_enum.fulfillment_types_arrays(filter);`
   * */
  fulfillment_types_arrays: function (obj) {
    return {
      pickup: function () {
        obj.fulfillment_types.push("PICKUP");
        return this;
      },
      shipment: function () {
        obj.fulfillment_types.push("SHIPMENT");
        return this;
      },
    };
  },

  /** @function fulfillment_state_arrays - For search order query
   * @fulfillment_states  enables a referencing class to set only allowable values on a property.
   * @param {object} obj - pass in the object containing the array (NOT the array itself)
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  `return order_fulfillment_enum.fulfillment_state_arrays(filter);`
   * */

  fulfillment_state_arrays: function (obj) {
    return {
      proposed: function () {
        obj.fulfillment_states.push("PROPOSED");
        return this;
      },
      reserved: function () {
        obj.fulfillment_states.push("RESERVED");
        return this;
      },
      prepared: function () {
        obj.fulfillment_states.push("PREPARED");
        return this;
      },
      completed: function () {
        obj.fulfillment_states.push("COMPLETED");
        return this;
      },
      canceled: function () {
        obj.fulfillment_states.push("CANCELED");
        return this;
      },
      failed: function () {
        obj.fulfillment_states.push("FAILED");
        return this;
      },
    };
  },

  /** @function state_filter_arrays - For search order query
   * @fulfillment_states  enables a referencing class to set only allowable values on a property.
   * @param {object} obj - pass in the object containing the array (NOT the array itself)
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *  `return order_fulfillment_enum.state_filter_arrays(filter);`
   * */

  state_filter_arrays: function (obj) {
    return {
      open: function () {
        obj.states.push("OPEN");
        return this;
      },
      completed: function () {
        obj.states.push("COMPLETED");
        return this;
      },
      canceled: function () {
        obj.states.push("CANCELED");
        return this;
      },
      draft: function () {
        obj.states.push("DRAFT");
        return this;
      },
    };
  },
};

module.exports = order_fulfillment_enum;
