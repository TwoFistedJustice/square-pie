/**
 * Forget the mixin docs and examples online. They don't work with class 'this'
 * passing 'this' as an argument works without counter-intuitive syntax
 * */

const order_discount_enum = {
  /** @enum  an array of the allowable values on a property.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *
   * Use in make() for preventing the class setter from passing disallowed values
   * Do not use in the setter itself because it will be called every time
   * */

  allowable_values: {
    type: [
      "UNKNOWN_DISCOUNT",
      "FIXED_PERCENTAGE",
      "FIXED_AMOUNT",
      "VARIABLE_PERCENTAGE",
      "VARIABLE_AMOUNT",
    ],
    scope: ["OTHER_DISCOUNT_SCOPE", "LINE_ITEM", "ORDER"],
  },

  /** @function enum
   * @enum  enables a referencing class to set only allowable values on a property.
   * @param {object} self - pass in 'this' from the referencing class.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #enum_PROPERTY_NAME() {
   *   return name_of_class_enum.property(this)
   * }
   * */

  type: function (self) {
    return {
      unknown: function () {
        self.type = "UNKNOWN_DISCOUNT";
        return this;
      },
      fixed_percentage: function () {
        self.type = "FIXED_PERCENTAGE";
        return this;
      },
      fixed_amount: function () {
        self.type = "FIXED_AMOUNT";
        return this;
      },
      variable_percentage: function () {
        self.type = "VARIABLE_PERCENTAGE";
        return this;
      },
      variable_amount: function () {
        self.type = "VARIABLE_AMOUNT";
        return this;
      },
    };
  },
  scope: function (self) {
    return {
      other: function () {
        self.scope = "OTHER_DISCOUNT_SCOPE";
        return this;
      },
      line_item: function () {
        self.scope = "LINE_ITEM";
        return this;
      },
      order: function () {
        self.scope = "ORDER";
        return this;
      },
    };
  },
};

module.exports = order_discount_enum;
