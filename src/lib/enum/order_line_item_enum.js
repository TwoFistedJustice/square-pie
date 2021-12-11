/**
 * Forget the mixin docs and examples online. They don't work with class 'this'
 * passing 'this' as an argument works without counter-intuitive syntax
 * */

const order_line_item_enum = {
  /** @enum_state  an array of the allowable values on a property.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   *
   * Use in make() for preventing the class setter from passing disallowed values
   * Do not use in the setter itself because it will be called every time
   * */

  allowable_values: { item_type: ["ITEM", "CUSTOM_AMOUNT"] },

  /** @function enum_state
   * @enum_state  enables a referencing class to set only allowable values on a property.
   * @param {object} self - pass in 'this' from the referencing class.
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * @example
   * #enum_PROPERTY_NAME() {
   *   return Name_Of_Class_property.enum_state(this)
   * }
   * */

  item_type: function (self) {
    return {
      item: function () {
        self.item_type = "ITEM";
        return this;
      },
      custom: function () {
        self.item_type = "CUSTOM_AMOUNT";
        return this;
      },
      gift: function () {
        self.item_type = "GIFT_CARD";
        return this;
      },
    };
  },
};

module.exports = order_line_item_enum;
