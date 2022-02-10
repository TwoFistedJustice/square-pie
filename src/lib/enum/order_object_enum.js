/**
 * Forget the mixin docs and examples online. They don't work with this syntax.
 * */

const order_object_enum = {
  /** @enum  an array of the allowable values on a property.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *
   * Use in make() for preventing the class setter from passing disallowed values
   * Do not use in the setter itself because it will be called every time
   * */

  allowable_values: { state: ["OPEN", "COMPLETED", "CANCELED", "DRAFT"] },

  /** @function enum
   * @enum  enables a referencing class to set only allowable values on a property.
   * @param {object} self - pass in 'this' from the referencing class.
   * @param {object} calling_this - pass in the calling function's 'this'
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #enum_PROPERTY_NAME() {
   *   return name_of_class_enum.property(this)
   * }
   * */

  state: function (self, calling_this) {
    return {
      open: function () {
        self.state = "OPEN";
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
      draft: function () {
        self.state = "DRAFT";
        return calling_this;
      },
    };
  },
};

module.exports = order_object_enum;
