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

  allowable_values: [
    "PROPOSED",
    "RESERVED",
    "PREPARED",
    "COMPLETED",
    "CANCELED",
    "FAILED",
  ],

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
};

module.exports = order_fulfillment_enum;
